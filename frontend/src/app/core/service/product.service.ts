import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { PagedProductResult } from '../models/PagedProductResult';
import { BehaviorSubject, Observable } from 'rxjs';
import { URL_API } from '../../shared/constants/url-api.constants';
import { Product } from '../models/Product';
import { ProductResponse } from '../models/productResponse';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private productsSubject = new BehaviorSubject<ProductResponse[]>([]);
	products$ = this.productsSubject.asObservable();
	constructor(private http: HttpClient) {}

	fetchProducts() {
		this.http
			.get<ApiResponse<PagedProductResult>>(URL_API.productsUrl)
			.subscribe({
				next: response => {
					if (response.code === 200) {
						this.productsSubject.next(response.result.content);
					}
          			console.log('Products:', response.result.content);
				},
				error: error => {
					console.error('Error fetching products:', error);
				},
			});
	}
}
