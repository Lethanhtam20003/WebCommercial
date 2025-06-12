import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { URL_API } from '../../shared/constants/url-api.constants';
import { Product } from '../models/response/product-response/Product';
import { ProductResponse } from '../models/response/product-response/productResponse';
import { Page } from '../models/response/page-response.interface';
import { PageResponse } from '../models/response/product-response/product-response/page-response.interface';

@Injectable({
	providedIn: 'root',
})
export class ProductService {	
	private pageProductsObject = new BehaviorSubject<PageResponse<ProductResponse>>({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } });
		pageProducts$ = this.pageProductsObject.asObservable();
	constructor(private http: HttpClient) {}


			

	fetchProducts() {
		this.http
			.get<ApiResponse<PageResponse<ProductResponse>>>(URL_API.productsUrl)
			.subscribe({
				next: response => {
					if (response.code === 200 && response.result) {
						this.pageProductsObject.next(response.result);
					}
				},
				error: error => {
					console.error('Error fetching products:', error);
				},
			});
	}
	// hàm lấy sản phẩm theo id 
	getProductById(id: number): Observable<ApiResponse<ProductResponse>> {
		return this.http.get<ApiResponse<ProductResponse>> (`${URL_API.productsUrl}/${id}`);
	}
}
