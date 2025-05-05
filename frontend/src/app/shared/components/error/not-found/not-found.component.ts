import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">Trang bạn đang tìm kiếm không tồn tại.</p>
      <a routerLink="/" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Về trang chủ
      </a>
    </div>
  `,
  styles: []
})
export class NotFoundComponent {} 