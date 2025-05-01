import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [NgIf, NgFor]
})
export class ProductListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  products = [
    {
      name: 'Women Hot Collection',
      price: 29,
      imageUrl: 'assets/images/shop/logo.png',
    },
    {
      name: 'Awesome Pink Show',
      price: 29,
      imageUrl: 'assets/images/shop/logo.png',
    },
    {
      name: 'Awesome Bags Collection',
      price: 29,
      imageUrl: 'assets/images/shop/logo.png',
    },
    {
      name: 'Women Pant Collections',
      price: 29,
      imageUrl: 'assets/images/shop/logo.png',
      label: 'New',
      labelColor: 'primary',
    },
    {
      name: 'Awesome Bags Collection',
      price: 29,
      imageUrl: 'assets/images/shop/logo.png',
    },
    {
      name: 'Awesome Cap For Women',
      price: 29,
      imageUrl: 'assets/images/shop/logo.png',
      label: '30% off',
      labelColor: 'warning',
    },
    {
      name: 'Polo Dress For Women',
      price: 29,
      imageUrl: 'assets/images/shop/logo.png',
    },
    {
      name: 'Black Sunglass For Women',
      originalPrice: 60,
      discountedPrice: 50,
      imageUrl: 'assets/images/shop/logo.png',
      label: 'Hot',
      labelColor: 'danger',
    },
  ];
  
  /**
   * Thêm sản phẩm vào giỏ hàng
   * @param product Sản phẩm được chọn
   */
  addToCart(product: any): void {
    console.log('Đã thêm vào giỏ hàng:', product.name);
    // Thêm logic xử lý thêm vào giỏ hàng ở đây
  }

  /**
   * Xem chi tiết sản phẩm
   * @param product Sản phẩm được chọn
   */
  viewProductDetails(product: any): void {
    console.log('Xem chi tiết sản phẩm:', product.name);
    // Thêm logic điều hướng đến trang chi tiết sản phẩm
  }

  /**
   * Thêm sản phẩm vào danh sách yêu thích
   * @param product Sản phẩm được chọn
   */
  addToWishlist(product: any): void {
    console.log('Đã thêm vào danh sách yêu thích:', product.name);
    // Thêm logic xử lý thêm vào danh sách yêu thích
  }

  /**
   * So sánh sản phẩm
   * @param product Sản phẩm được chọn
   */
  compareProduct(product: any): void {
    console.log('Đã thêm vào danh sách so sánh:', product.name);
    // Thêm logic xử lý so sánh sản phẩm
  }
}
