import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { URL_API } from '../../shared/constants/url-api.constants';
import { Product } from '../models/response/product-response/Product';
import { ProductResponse } from '../models/response/product-response/productResponse';
import { Page } from '../models/response/page-response.interface';
import { PageResponse } from '../models/response/product-response/product-response/page-response.interface';
import { ProductFilter } from '../models/request/filter/productFilter';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private pageProductsObject = new BehaviorSubject<
		PageResponse<ProductResponse>
	>({
		content: [],
		page: { number: 0, size: 0, totalElements: 0, totalPages: 0 },
	});
	pageProducts$ = this.pageProductsObject.asObservable();
	constructor(private http: HttpClient) {}

	fetchProducts(productFilter?: ProductFilter) {
		const params: any = {};
		if (productFilter) {
			params.page = productFilter.page;
			params.size = productFilter.size;
			if (productFilter.id) {
				params.id = productFilter.id;
			}
			if (productFilter.name) {
				params.name = productFilter.name;
			}
			if (productFilter.status) {
				params.status = productFilter.status;
			}
			if (productFilter.minPrice != null) {
				params.minPrice = productFilter.minPrice;
			}
			if (productFilter.maxPrice != null) {
				params.maxPrice = productFilter.maxPrice;
			}
			if (productFilter.promotionId) {
				params.promotionId = productFilter.promotionId;
			}

			if (productFilter.categoryId && productFilter.categoryId.length > 0) {
				productFilter.categoryId.forEach(id => {
					if (!params['categoryId']) {
						params['categoryId'] = [];
					}
					params['categoryId'].push(id);
				});
			}

			if (productFilter.sortByPrice) {
				params.sort = `price,${productFilter.sortByPrice.toLowerCase()}`; // ex: sort=price,asc
			}
		}
		this.http
			.get<
				ApiResponse<PageResponse<ProductResponse>>
			>(URL_API.productsUrl, { params })
			.subscribe({
				next: response => {
					if (response.code === 200 && response.result) {
						this.pageProductsObject.next(response.result);
						console.log(response.result);
						
					}
				},
				error: error => {
					console.error('Error fetching products:', error);
				},
			});
	}
	// hàm lấy sản phẩm theo id
	getProductById(id: number): Observable<ApiResponse<ProductResponse>> {
		return this.http.get<ApiResponse<ProductResponse>>(
			`${URL_API.productsUrl}/${id}`
		);
	}
}
