import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="bg-white shadow">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">My Application</h1>
        <nav class="space-x-4">
          <a routerLink="/" class="text-gray-700 hover:text-gray-900">Home</a>
          <a routerLink="/about" class="text-gray-700 hover:text-gray-900">About</a>
          <a routerLink="/contact" class="text-gray-700 hover:text-gray-900">Contact</a>
        </nav>
      </div>
    </header>  
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor( private http: HttpClient, private router: Router) {}
}


