import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface UploadResult {
  file_path: string;
  public_url: string;
}

@Injectable()
export class StorageService {
  private readonly client: SupabaseClient;
  private readonly bucket: string;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    this.bucket = process.env.SUPABASE_STORAGE_BUCKET ?? 'product-images';

    if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');

    this.client = createClient(url, key);
  }

  async upload(file: Buffer, filename: string, mimetype: string): Promise<UploadResult> {
    const file_path = `${Date.now()}-${filename}`;

    const { error } = await this.client.storage
      .from(this.bucket)
      .upload(file_path, file, { contentType: mimetype, upsert: false });

    if (error) throw new InternalServerErrorException(`Storage upload failed: ${error.message}`);

    const { data } = this.client.storage.from(this.bucket).getPublicUrl(file_path);

    return { file_path, public_url: data.publicUrl };
  }

  async remove(file_path: string): Promise<void> {
    const { error } = await this.client.storage.from(this.bucket).remove([file_path]);
    if (error) throw new InternalServerErrorException(`Storage remove failed: ${error.message}`);
  }
}
