/**
 * S3StorageDriver — AWS S3 Storage Provider implementation.
 * Uses AWS SigV4 with native crypto and fetch (zero external dependencies).
 * Fully compatible with AWS Free Tier (5 GB Standard Storage).
 */

import crypto from 'node:crypto';
import type { StorageProvider } from './StorageProvider';

export interface S3Config {
  bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  endpoint?: string;
  publicBaseUrl?: string;
}

export class S3StorageDriver implements StorageProvider {
  private bucket: string;
  private region: string;
  private accessKeyId: string;
  private secretAccessKey: string;
  private endpoint: string;
  private publicBaseUrl: string;

  constructor(config: S3Config) {
    this.bucket = config.bucket;
    this.region = config.region || 'ap-southeast-2';
    this.accessKeyId = config.accessKeyId;
    this.secretAccessKey = config.secretAccessKey;
    this.endpoint = config.endpoint || `https://${this.bucket}.s3.${this.region}.amazonaws.com`;
    this.publicBaseUrl =
      config.publicBaseUrl?.replace(/\/$/, '') ||
      `https://${this.bucket}.s3.${this.region}.amazonaws.com`;
  }

  private getSignatureKey(key: string, dateStamp: string, regionName: string, serviceName: string) {
    const kDate = crypto.createHmac('sha256', 'AWS4' + key).update(dateStamp).digest();
    const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest();
    const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest();
    const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
    return kSigning;
  }

  private signRequest(
    method: string,
    canonicalUri: string,
    headers: Record<string, string>,
    payloadHash: string,
    now: Date
  ): Record<string, string> {
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.substring(0, 8);

    const host = new URL(this.endpoint).host;
    const reqHeaders: Record<string, string> = {
      ...headers,
      host,
      'x-amz-date': amzDate,
      'x-amz-content-sha256': payloadHash,
    };

    const sortedHeaderKeys = Object.keys(reqHeaders).sort();
    const canonicalHeaders = sortedHeaderKeys
      .map((k) => `${k.toLowerCase()}:${reqHeaders[k].trim()}\n`)
      .join('');
    const signedHeaders = sortedHeaderKeys.map((k) => k.toLowerCase()).join(';');

    const canonicalRequest = [
      method,
      canonicalUri,
      '', // query string
      canonicalHeaders,
      signedHeaders,
      payloadHash,
    ].join('\n');

    const credentialScope = `${dateStamp}/${this.region}/s3/aws4_request`;
    const stringToSign = [
      'AWS4-HMAC-SHA256',
      amzDate,
      credentialScope,
      crypto.createHash('sha256').update(canonicalRequest).digest('hex'),
    ].join('\n');

    const signingKey = this.getSignatureKey(this.secretAccessKey, dateStamp, this.region, 's3');
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

    const authHeader = `AWS4-HMAC-SHA256 Credential=${this.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    return {
      ...reqHeaders,
      Authorization: authHeader,
    };
  }

  async put(
    key: string,
    body: Buffer,
    opts: { contentType: string; cacheControl: string }
  ): Promise<void> {
    const cleanKey = key.replace(/^\/+/, '');
    const canonicalUri = `/${cleanKey}`;
    const payloadHash = crypto.createHash('sha256').update(body).digest('hex');
    const now = new Date();

    const signedHeaders = this.signRequest(
      'PUT',
      canonicalUri,
      {
        'content-type': opts.contentType || 'application/octet-stream',
        'cache-control': opts.cacheControl || 'public, max-age=31536000',
        'content-length': body.length.toString(),
      },
      payloadHash,
      now
    );

    const url = `${this.endpoint}/${cleanKey}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: signedHeaders,
      body: body as unknown as BodyInit,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`S3 PUT failed with status ${res.status}: ${errText}`);
    }
  }

  async delete(key: string): Promise<void> {
    const cleanKey = key.replace(/^\/+/, '');
    const canonicalUri = `/${cleanKey}`;
    const payloadHash = crypto.createHash('sha256').update('').digest('hex');
    const now = new Date();

    const signedHeaders = this.signRequest('DELETE', canonicalUri, {}, payloadHash, now);
    const url = `${this.endpoint}/${cleanKey}`;

    const res = await fetch(url, {
      method: 'DELETE',
      headers: signedHeaders,
    });

    if (!res.ok && res.status !== 404) {
      const errText = await res.text();
      throw new Error(`S3 DELETE failed with status ${res.status}: ${errText}`);
    }
  }

  publicUrl(key: string): string {
    const cleanKey = key.replace(/^\/+/, '');
    return `${this.publicBaseUrl}/${cleanKey}`;
  }

  async exists(key: string): Promise<boolean> {
    const cleanKey = key.replace(/^\/+/, '');
    const canonicalUri = `/${cleanKey}`;
    const payloadHash = crypto.createHash('sha256').update('').digest('hex');
    const now = new Date();

    const signedHeaders = this.signRequest('HEAD', canonicalUri, {}, payloadHash, now);
    const url = `${this.endpoint}/${cleanKey}`;

    try {
      const res = await fetch(url, {
        method: 'HEAD',
        headers: signedHeaders,
      });
      return res.status >= 200 && res.status < 300;
    } catch {
      return false;
    }
  }
}
