import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  standalone: true,
  imports: [CommonModule,NgFor],
  selector: 'app-product-list2',
  templateUrl: './product-list2.component.html',
  styleUrls: ['./product-list2.component.scss']
})
export class ProductList2Component implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 99.99,
      imageUrl: 'assets/images/shop/logo.png'
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 149.99,
      imageUrl: 'assets/images/shop/logo.png'
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 199.99,
      imageUrl: 'assets/images/shop/logo.png'
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 129.99,
      imageUrl: 'assets/images/shop/logo.png'
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 179.99,
      imageUrl: 'assets/images/shop/logo.png'
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 159.99,
      imageUrl: 'assets/images/shop/logo.png'
    },
    {
      id: 7,
      name: 'Product 7',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 189.99,
      imageUrl: 'assets/images/shop/logo.png'
    },
    {
      id: 8,
      name: 'Product 8',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 139.99,
      imageUrl: 'assets/images/shop/logo.png'
    },
    {
      id: 9,
      name: 'Product 9',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 169.99,
      imageUrl: 'assets/images/shop/logo.png'
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  addToCart(product: Product): void {
    console.log('Added to cart:', product);
    // Implement your add to cart logic here
  }
}
