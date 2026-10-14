/**
 * Local disk storage driver — development and single-server deployments.
 *
 * Writes files to the configured uploads directory.
 * Served by a Next.js route handler with immutable caching.
 */

import fs from 'fs/promises';
import path from 'path';
import type { StorageProvider } from './StorageProvider';

export class LocalStorageDriver implements StorageProvider {
  private readonly baseDir: string;
  private readonly publicBaseUrl: string;

  constructor(baseDir: string, publicBaseUrl: string) {
    this.baseDir = path.resolve(baseDir);
    this.publicBaseUrl = publicBaseUrl.replace(/\/$/, '');
  }

  private resolveSafePath(key: string): string {
    // Disallow null bytes and ensure key is a clean relative path
    if (key.includes('\0') || path.isAbsolute(key)) {
      throw new Error('Invalid storage key');
    }
    const resolvedPath = path.resolve(this.baseDir, key);
    // Ensure the resolved path stays within baseDir
    if (!resolvedPath.startsWith(this.baseDir + path.sep) && resolvedPath !== this.baseDir) {
      throw new Error('Path traversal detected');
    }
    return resolvedPath;
  }

  async put(
    key: string,
    body: Buffer,
    _opts: { contentType: string; cacheControl: string }
  ): Promise<void> {
    const filePath = this.resolveSafePath(key);
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, body);
  }

  async delete(key: string): Promise<void> {
    const filePath = this.resolveSafePath(key);
    try {
      await fs.unlink(filePath);
    } catch (err) {
      // Ignore if file doesn't exist
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw err;
      }
    }
  }

  publicUrl(key: string): string {
    const cleanKey = key.replace(/^\/+/, '');
    return `${this.publicBaseUrl}/${cleanKey}`;
  }

  async exists(key: string): Promise<boolean> {
    try {
      const filePath = this.resolveSafePath(key);
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
