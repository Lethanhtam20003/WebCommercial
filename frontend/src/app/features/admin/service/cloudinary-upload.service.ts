import { Injectable } from '@angular/core';
import { AdminModule } from '../admin.module';
@Injectable({
  providedIn: AdminModule
})
export class CloudinaryUploadService {
   private readonly CLOUD_NAME = 'doabxq0zi';
  private readonly UPLOAD_PRESET = 'web_commercial';

  private readonly UPLOAD_URL = `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`;

  constructor() {}

  uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.UPLOAD_PRESET);

    return fetch(this.UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => data.secure_url)
      .catch(err => {
        console.error('Upload error:', err);
        throw err;
      });
  }
}
