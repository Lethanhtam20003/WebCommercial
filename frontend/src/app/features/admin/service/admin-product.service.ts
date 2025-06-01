import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductResponse } from '../../../core/models/response/product-response/productResponse';
import { map, Observable, Subject } from 'rxjs';
import { URL_API } from '../../../shared/constants/url-api.constants';
import { ApiResponse } from '../../../core/models/api-response.model';
import { AdminModule } from '../admin.module';
import { ProductRequest } from '../models/ProductRequest';
import { PageResponse } from '../models/product-response/page-response.interface';
import { PageRequest } from '../models/request/pageRequest.interface';

@Injectable({
	providedIn: AdminModule,
})
export class AdminProductService {
	private pageProductsObject = new Subject<PageResponse<ProductResponse>>();
	pageProducts$ = this.pageProductsObject.asObservable();
	constructor(private http: HttpClient) {}

	ngOnInit(): void {}

	getAll(pageRequest: PageRequest): Observable<PageResponse<ProductResponse>> {
		let params = new HttpParams()
			.set('page', pageRequest.page.toString())
			.set('size', pageRequest.size.toString());

		if (pageRequest.sortMap) {
			Object.entries(pageRequest.sortMap)
				.filter(([_, direction]) => direction !== 'none')
				.forEach(([field, direction]) => {
					params = params.append('sort', `${field},${direction}`);
				});
		}

		return this.http
			.get<
				ApiResponse<PageResponse<ProductResponse>>
			>(URL_API.productsUrl, { params })
			.pipe(map(response => response.result));
	}

	createProduct(
		product: ProductRequest
	): Observable<ApiResponse<ProductResponse>> {
		return this.http
			.post<ApiResponse<ProductResponse>>(URL_API.productsUrl, product)
			.pipe(map(response => response));
	}

	checkProductNameExited(name: string): Observable<boolean> {
		const params = new HttpParams().set('name', name.trim());
		return this.http
			.get<ApiResponse<boolean>>(URL_API.checkProductNameExited, { params })
			.pipe(map(response => !!response.result));
	}
}
