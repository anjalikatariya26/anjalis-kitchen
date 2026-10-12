/**
 * StorageProvider interface — ADR-006
 *
 * Abstracts file storage so the application can swap between
 * local disk, S3, Cloudinary, or Supabase with one config change.
 */

export interface StorageProvider {
  /**
   * Store a file.
   * @param key - Unique storage key (e.g. "images/abc123/320.webp")
   * @param body - File contents
   * @param opts - Content type and cache control headers
   */
  put(
    key: string,
    body: Buffer,
    opts: { contentType: string; cacheControl: string }
  ): Promise<void>;

  /**
   * Delete a file.
   */
  delete(key: string): Promise<void>;

  /**
   * Get the public URL for a stored file.
   */
  publicUrl(key: string): string;

  /**
   * Check if a file exists.
   */
  exists(key: string): Promise<boolean>;
}
