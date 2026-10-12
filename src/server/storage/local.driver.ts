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

  async put(
    key: string,
    body: Buffer,
    _opts: { contentType: string; cacheControl: string }
  ): Promise<void> {
    const filePath = path.join(this.baseDir, key);
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, body);
  }

  async delete(key: string): Promise<void> {
    const filePath = path.join(this.baseDir, key);
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
    return `${this.publicBaseUrl}/${key}`;
  }

  async exists(key: string): Promise<boolean> {
    const filePath = path.join(this.baseDir, key);
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
