import { get, put, del, list } from '@vercel/blob';
import type { Store } from './inquiry-delivery.ts';

export const blobStore: Store = {
  async read<T>(key: string): Promise<T | null> {
    const result = await get(key, { access: 'private', useCache: false });
    if (!result) return null;
    if (result.statusCode !== 200) throw new Error('Outbox read unavailable');
    return await new Response(result.stream).json() as T;
  },
  async create<T>(key: string, value: T): Promise<T> {
    try {
      await put(key, JSON.stringify(value), { access: 'private', addRandomSuffix: false, allowOverwrite: false, contentType: 'application/json' });
      return value;
    } catch {
      // Covers both concurrent create and a lost write acknowledgement.
      // Never report persistence unless the exact record can be read back.
      const existing = await blobStore.read<T>(key);
      if (existing !== null) return existing;
      throw new Error('Outbox write unavailable');
    }
  },
  async remove(key) { await del(key); },
  async list(cursor) {
    const result = await list({ prefix: 'inquiries/v1/pending/', limit: 20, cursor });
    return { keys: result.blobs.map(blob => blob.pathname), cursor: result.hasMore ? result.cursor : undefined };
  },
};
export async function saveCursor(cursor?: string) {
  await put('inquiries/v1/scan-cursor.json', JSON.stringify({ cursor: cursor || null }), { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json' });
}
