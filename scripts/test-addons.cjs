const fs = require('fs');
const src = '/home/ec2-user/anjalis-kitchen/node_modules/.pnpm/argon2@0.45.1/node_modules/argon2/build/Release/argon2.node';
const dest = '/home/ec2-user/anjalis-kitchen/.next/standalone/node_modules/.pnpm/argon2@0.45.1/node_modules/argon2/prebuilds/linux-x64/argon2.glibc.node';

console.log('Copying locally compiled binary over the broken prebuild...');
fs.copyFileSync(src, dest);

// Also copy to standalone build release if it exists or create it
const destReleaseDir = '/home/ec2-user/anjalis-kitchen/.next/standalone/node_modules/.pnpm/argon2@0.45.1/node_modules/argon2/build/Release';
if (!fs.existsSync(destReleaseDir)) {
  fs.mkdirSync(destReleaseDir, { recursive: true });
}
fs.copyFileSync(src, destReleaseDir + '/argon2.node');

console.log('Now testing require of argon2 from standalone...');
const argon2 = require('/home/ec2-user/anjalis-kitchen/.next/standalone/node_modules/argon2');
argon2.hash('HelloAdmin123!').then(h => {
  console.log('STANDALONE ARGON2 HASH SUCCEEDED!');
  console.log('Hash result:', h);
  process.exit(0);
}).catch(err => {
  console.error('Hash failed:', err);
  process.exit(1);
});
