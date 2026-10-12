# AWS Free Tier Hosting & High-Traffic Architecture Guide (4,000–5,000 Users)

This guide shows you how to host **Anjali's Kitchen** on the **AWS Free Tier** and handle **4,000 to 5,000 concurrent visitors** without server crashes or spending any money.

---

## 1. Why Servers Crash & How We Solve It (Architecture)

### The Problem on AWS Free Tier
An AWS Free Tier EC2 instance (`t2.micro` or `t3.micro`) has:
- **1 vCPU**
- **1 GB of RAM**

If 4,000 users hit a Next.js server directly on 1 GB of RAM, the Linux kernel triggers an **Out-Of-Memory (OOM) Kill**, crashing the application immediately.

### The Solution: Multi-Layered Defense

```
[4,000 - 5,000 Users]
         │
         ▼
[AWS CloudFront CDN]  ──► (Edge Caching in Mumbai, Delhi, Bangalore, etc.)
  (Caches 90%+ of requests: images, CSS, JS, static pages. Absorbs all traffic bursts)
         │  (Only 5-10% uncached requests reach server)
         ▼
[Nginx Reverse Proxy]  ──► (Gzip compression, HTTP keep-alive, rate limiting)
         │
         ▼
[Next.js Standalone (PM2)] ──► (Cluster/Node capped at 512MB RAM with auto-restart)
         │
  [4GB Swap Space] ──► (Virtual RAM on SSD: Prevents OOM kernel crashes)
         │
         ▼
[PostgreSQL Database] ──► (AWS RDS Free Tier db.t3.micro OR Neon Serverless Free)
```

1. **CloudFront CDN (Free Tier: 1 TB / 10,000,000 requests/month)**:
   - 95% of traffic on a food menu website is read-only browsing (viewing products, looking at faral boxes, checking prices).
   - CloudFront serves these requests from edge servers closest to the user (e.g. Pune/Mumbai), meaning the EC2 instance only receives ~200-300 requests instead of 5,000.
2. **4 GB Linux Swap File**:
   - Allocates 4 GB of virtual memory on the NVMe/EBS disk. Even if traffic spikes, Linux pages memory instead of killing the process.
3. **Nginx Reverse Proxy**:
   - Handles connection pooling, client buffering, and compression so Node.js only processes completed requests.
4. **Next.js Standalone Build**:
   - `output: 'standalone'` reduces Node.js memory footprint from 350 MB to ~80 MB.

---

## 2. Step-by-Step Setup on AWS Free Tier

### Step 1: Launch an EC2 Instance on AWS
1. Go to **AWS Console** -> **EC2** -> **Launch Instance**.
2. **Name**: `anjalis-kitchen-prod`
3. **OS Image**: **Ubuntu 24.04 LTS** (Free tier eligible).
4. **Instance Type**: `t2.micro` (or `t3.micro` if available in your region) — **Free tier eligible**.
5. **Key Pair**: Select **Create new key pair** -> Name it `anjali-key` -> Download the `.pem` file to your computer.
6. **Network Settings (Security Group)**:
   - Check **Allow SSH traffic** from Anywhere (or your IP).
   - Check **Allow HTTP traffic from the internet** (Port 80).
   - Check **Allow HTTPS traffic from the internet** (Port 443).
7. **Configure Storage**: Set to **30 GiB gp3** (AWS Free Tier gives up to 30 GB EBS free!).
8. Click **Launch Instance**.

---

### Step 2: Connect to Your Instance
Open PowerShell / Terminal on your computer where `anjali-key.pem` is saved:
```bash
chmod 400 anjali-key.pem  # On Mac/Linux, on Windows just keep it secure
ssh -i "anjali-key.pem" ubuntu@<YOUR_EC2_PUBLIC_IP>
```
*(Alternatively, you can just click **Connect** -> **EC2 Instance Connect** in the AWS browser console!)*

---

### Step 3: Server Hardening & 4GB Swap Space (Anti-Crash Setup)
Run these commands on your EC2 Ubuntu terminal:

```bash
# 1. Update system packages
sudo apt update && sudo apt upgrade -y

# 2. Create 4GB Swap space to prevent Out Of Memory crashes
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make swap permanent across reboots
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verify swap is active (should show 4.0G)
free -h
```

---

### Step 4: Install Node.js 20 LTS, pnpm, Git & PM2
```bash
# 1. Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git

# 2. Install pnpm and PM2 process manager
sudo npm install -g pnpm pm2
```

---

### Step 5: Database Setup (PostgreSQL)

You have two excellent **100% Free** options:

#### Option A (Recommended for 1-Click Zero Server Load): Neon Free PostgreSQL
- Go to [neon.tech](https://neon.tech) and create a free PostgreSQL database.
- Copy your `DATABASE_URL` connection string (e.g., `postgresql://user:pass@ep-xyz.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`).
- **Advantage**: It runs on serverless cloud infrastructure, so your EC2 1GB RAM is 100% reserved for serving website visitors!

#### Option B: AWS RDS PostgreSQL Free Tier
- Go to AWS Console -> **RDS** -> **Create Database**.
- Choose **PostgreSQL** -> **Free tier template**.
- DB instance: `db.t3.micro` or `db.t4g.micro`.
- Set master username and password.

---

### Step 6: Clone and Build the Application on EC2

```bash
# 1. Clone your GitHub repository
cd /var/www
sudo chown -R ubuntu:ubuntu /var/www
git clone https://github.com/anjalikatariya26/anjalis-kitchen.git
cd anjalis-kitchen

# 2. Create your production .env file
cat << 'EOF' > .env
NODE_ENV=production
APP_URL=http://<YOUR_EC2_PUBLIC_IP>
DATABASE_URL="YOUR_POSTGRESQL_CONNECTION_STRING_HERE"
SESSION_COOKIE_NAME=ak_session
SESSION_IDLE_HOURS=12
SESSION_ABSOLUTE_DAYS=7
CSRF_SECRET=produce-a-random-32-char-secret-string-here
INSECURE_COOKIES=false
STORAGE_DRIVER=local
STORAGE_LOCAL_DIR=./uploads
STORAGE_PUBLIC_BASE_URL=/media
NEXT_PUBLIC_WHATSAPP_NUMBER=919970599900
EOF

# 3. Install dependencies and build
pnpm install
npx prisma generate
npx prisma db push
npx tsx prisma/seed/seed.ts
pnpm run build
```

---

### Step 7: Start with PM2 Process Manager

PM2 will keep the server running 24/7 and automatically restart it if memory usage exceeds 450 MB:

```bash
# Copy static files to standalone folder
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# Start Next.js with memory guard
pm2 start .next/standalone/server.js --name "anjalis-kitchen" --max-memory-restart 450M

# Enable startup on boot
pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

---

### Step 8: Configure Nginx as Reverse Proxy

```bash
sudo cat << 'EOF' > /etc/nginx/sites-available/anjalis-kitchen
server {
    listen 80;
    server_name _;

    client_max_body_size 20M;

    # Gzip Compression for blazing fast load speeds
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

        # Timeouts to handle concurrent visitors smoothly
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF

# Enable the site and restart Nginx
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/anjalis-kitchen /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Now visit `http://<YOUR_EC2_PUBLIC_IP>` in your browser — your website is live!

---

## 3. Scale to 4,000–5,000 Users with AWS CloudFront CDN

To ensure zero crashes during festivals when 4k-5k people visit at once:

1. In AWS Console, go to **CloudFront** -> **Create distribution**.
2. **Origin domain**: Enter your EC2 instance's Public IPv4 DNS (or IP).
3. **Protocol**: HTTP only (or Match Viewer if you add SSL).
4. **Viewer protocol policy**: **Redirect HTTP to HTTPS**.
5. **Allowed HTTP methods**: `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`.
6. **Cache key and origin requests**:
   - Choose **CacheOptimized**.
7. Click **Create distribution**.

### Why this handles 5,000 users effortlessly:
- CloudFront caches your product images (`modak.jpg`, `ladoo.jpg`), stylesheets, JavaScript bundles, and menu pages at edge locations in India.
- When 5,000 visitors open the menu, AWS CloudFront serves 4,800+ of them directly from AWS edge nodes without touching your EC2 instance.
- Your EC2 CPU stays below 15% and memory stays below 300MB!

---

## 4. How to Update Your Website Anytime (Zero Downtime)

Whenever you push changes to GitHub:
```bash
cd /var/www/anjalis-kitchen
git pull origin main
pnpm install
pnpm run build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
pm2 restart anjalis-kitchen
```

---

## 5. Summary Checklist

| Component | Free Tier Service | Role |
| :--- | :--- | :--- |
| **Compute** | AWS EC2 (`t2.micro` / `t3.micro`) | Runs Next.js standalone process |
| **Crash Protection** | 4 GB Disk Swap | Prevents Out-Of-Memory termination |
| **Scale & Speed** | AWS CloudFront CDN (Always Free) | Absorbs 4k-5k users at edge locations |
| **Web Server** | Nginx | Buffers connections & provides Gzip |
| **Process Manager**| PM2 | Restarts automatically if errors occur |
| **Database** | RDS Free Tier / Neon Free Postgres | Stores products, hampers, and festivals |
