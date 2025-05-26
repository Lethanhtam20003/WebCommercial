import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  isProductMenuOpen = false;
  constructor(private router: Router) { 
    
    this.showCollapse(router);
  }

  ngOnInit() {
  }

  showCollapse(router: Router): void {
    // Kiểm tra nếu route hiện tại là product-list/create-product => mở collapse
      const {url} = this.router;
      this.isProductMenuOpen = url.includes('/product-management/');
  }
  isInventoryMenuOpen = false;
  toggleInventoryMenu() {
    this.isInventoryMenuOpen = !this.isInventoryMenuOpen;
  }
}

