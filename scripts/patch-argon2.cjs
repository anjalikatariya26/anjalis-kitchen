/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

function findFile(dir, pattern) {
  if (!fs.existsSync(dir)) return null;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findFile(fullPath, pattern);
      if (found) return found;
    } else if (pattern.test(entry.name) && fullPath.includes('Release')) {
      return fullPath;
    }
  }
  return null;
}

function patch() {
  const root = path.resolve(__dirname, '..');
  const standaloneDir = path.join(root, '.next', 'standalone');

  if (!fs.existsSync(standaloneDir)) {
    return;
  }

  const compiled = findFile(path.join(root, 'node_modules'), /^argon2\.node$/);
  if (!compiled) {
    return;
  }

  function patchInDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        patchInDir(fullPath);
      } else if (entry.name === 'argon2.glibc.node') {
        fs.copyFileSync(compiled, fullPath);
        console.log(`[patch-argon2] Patched standalone argon2 binary: ${fullPath}`);
      }
    }
  }

  patchInDir(standaloneDir);
}

patch();
