#!/bin/bash
set -e

echo "=== 1. Setting up PostgreSQL database ==="
sudo systemctl start postgresql || true

sudo -u postgres psql -tc "SELECT 1 FROM pg_roles WHERE rolname='anjali'" | grep -q 1 || \
sudo -u postgres psql -c "CREATE USER anjali WITH PASSWORD 'change-me' CREATEDB;"

sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname='anjalis_kitchen'" | grep -q 1 || \
sudo -u postgres psql -c "CREATE DATABASE anjalis_kitchen OWNER anjali;"

sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE anjalis_kitchen TO anjali;"
sudo -u postgres psql -d anjalis_kitchen -c "CREATE EXTENSION IF NOT EXISTS citext;"
sudo -u postgres psql -d anjalis_kitchen -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;"

# Configure pg_hba.conf for password auth
sudo sed -i 's/ident/md5/g' /var/lib/pgsql/data/pg_hba.conf
sudo sed -i 's/scram-sha-256/md5/g' /var/lib/pgsql/data/pg_hba.conf
sudo sed -i 's/local   all             all                                     md5/local   all             all                                     trust/g' /var/lib/pgsql/data/pg_hba.conf
sudo systemctl restart postgresql

echo "=== 2. Cloning/Pulling Repository ==="
if [ -d "/home/ec2-user/anjalis-kitchen" ]; then
    cd /home/ec2-user/anjalis-kitchen
    git pull origin main
else
    cd /home/ec2-user
    git clone https://github.com/anjalikatariya26/anjalis-kitchen.git
    cd /home/ec2-user/anjalis-kitchen
fi

echo "=== 3. Writing .env ==="
cat << 'EOF' > .env
NODE_ENV=production
APP_URL=http://3.27.1.14
DATABASE_URL=postgresql://anjali:change-me@127.0.0.1:5432/anjalis_kitchen?schema=public
SESSION_COOKIE_NAME=ak_session
SESSION_IDLE_HOURS=12
SESSION_ABSOLUTE_DAYS=7
CSRF_SECRET=ak-prod-secret-2801f1f-anjalis-kitchen-2026
INSECURE_COOKIES=true
STORAGE_DRIVER=local
STORAGE_LOCAL_DIR=./uploads
STORAGE_PUBLIC_BASE_URL=/media
NEXT_PUBLIC_WHATSAPP_NUMBER=919970599900
EOF

echo "=== 4. Installing dependencies & Migrating DB ==="
pnpm install
npx prisma generate
npx prisma db push --accept-data-loss
npx tsx prisma/seed/seed.ts || true

echo "=== 5. Building Next.js Standalone ==="
pnpm run build

# Copy static assets to standalone output
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

echo "=== 6. Configuring PM2 ==="
pm2 delete anjalis-kitchen || true
pm2 start .next/standalone/server.js --name "anjalis-kitchen" --max-memory-restart 450M
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/local/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user || true

echo "=== 7. Configuring Nginx ==="
sudo tee /etc/nginx/conf.d/anjalis-kitchen.conf << 'EOF_NGINX' > /dev/null
server {
    listen 80;
    server_name _;

    client_max_body_size 20M;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml font/woff2 image/svg+xml;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF_NGINX

sudo nginx -t
sudo systemctl enable nginx
sudo systemctl restart nginx

echo "=== 8. Verification ==="
sleep 3
curl -I http://127.0.0.1:3000
curl -I http://127.0.0.1:80

echo "=== ALL DONE SUCCESSFULLY! ==="
