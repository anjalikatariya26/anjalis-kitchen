import path from 'path';
import type { StorageProvider } from './StorageProvider';
import { LocalStorageDriver } from './local.driver';
import { S3StorageDriver } from './s3.driver';

let instance: StorageProvider | null = null;

function resolveUploadDir(): string {
  const configured = process.env.STORAGE_LOCAL_DIR;
  if (configured && path.isAbsolute(configured)) {
    return configured;
  }
  const cwd = process.cwd();
  // If running inside Next.js standalone directory (.next/standalone), resolve to project root
  if (cwd.includes(path.join('.next', 'standalone')) || cwd.includes('.next/standalone')) {
    return path.resolve(cwd, '..', '..', configured ?? 'uploads');
  }
  return path.resolve(cwd, configured ?? 'uploads');
}

export function getStorage(): StorageProvider {
  if (instance) return instance;

  const driver = process.env.STORAGE_DRIVER ?? 'local';

  switch (driver) {
    case 'local':
      instance = new LocalStorageDriver(
        resolveUploadDir(),
        process.env.STORAGE_PUBLIC_BASE_URL ?? '/media'
      );
      break;

    case 's3':
      instance = new S3StorageDriver({
        bucket: process.env.AWS_S3_BUCKET || 'anjalis-kitchen-uploads',
        region: process.env.AWS_REGION || 'ap-southeast-2',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        endpoint: process.env.AWS_S3_ENDPOINT,
        publicBaseUrl: process.env.AWS_S3_PUBLIC_BASE_URL,
      });
      break;

    case 'cloudinary':
      throw new Error('Cloudinary storage driver not yet implemented');

    case 'supabase':
      throw new Error('Supabase storage driver not yet implemented');

    default:
      throw new Error(`Unknown storage driver: ${driver}`);
  }

  return instance;
}
