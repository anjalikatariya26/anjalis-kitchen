/**
 * Storage factory — resolves the configured driver.
 */
import type { StorageProvider } from './StorageProvider';
import { LocalStorageDriver } from './local.driver';

let instance: StorageProvider | null = null;

export function getStorage(): StorageProvider {
  if (instance) return instance;

  const driver = process.env.STORAGE_DRIVER ?? 'local';

  switch (driver) {
    case 'local':
      instance = new LocalStorageDriver(
        process.env.STORAGE_LOCAL_DIR ?? './uploads',
        process.env.STORAGE_PUBLIC_BASE_URL ?? '/media'
      );
      break;

    case 's3':
      // Future: import and instantiate S3StorageDriver
      throw new Error('S3 storage driver not yet implemented');

    case 'cloudinary':
      throw new Error('Cloudinary storage driver not yet implemented');

    case 'supabase':
      throw new Error('Supabase storage driver not yet implemented');

    default:
      throw new Error(`Unknown storage driver: ${driver}`);
  }

  return instance;
}
