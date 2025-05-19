import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Product } from '../../../models/Product';
import { AdminProductService } from '../../../service/admin-product.service';
import { ProductResponse } from '../../../models/productResponse';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit {
  constructor(private adminProductService: AdminProductService, private router: Router) { }

  products: ProductResponse[] = [];

  ngOnInit() {
    this.adminProductService.getAll().subscribe(data => {
      console.log('data', data);
      this.products = data; 
    });
  }

}
