import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
  ],
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {
  }

}
