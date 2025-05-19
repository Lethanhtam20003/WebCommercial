import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Product } from '../../../models/Product';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf],
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {
  constructor() { }

  products: Product[] = [
    {
      imageUrl: 'http://localhost:4200/assets/images/shop/logo.png',
      name: 'Nội thất văn phòng VP04',
      price: 0,
      discountPrice: 0,
      category: 'Văn phòng',
      inStock: true,
      isHot: false,
      isNew: false,
      isPromo: false,
      visible: true,
      order: 1,
    },
    // ...thêm các sản phẩm khác
  ];

  ngOnInit() {
  }

}
