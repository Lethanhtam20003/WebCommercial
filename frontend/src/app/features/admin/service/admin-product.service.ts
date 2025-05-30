import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductResponse } from '../../../core/models/productResponse';
import { map, Observable, Subject } from 'rxjs';
import { URL_API } from '../../../shared/constants/url-api.constants';
import { ApiResponse } from '../../../core/models/api-response.model';
import { AdminModule } from '../admin.module';
import { PagedProductResult } from '../../../core/models/PagedProductResult';
import { ProductRequest } from '../models/ProductRequest';

@Injectable({
	providedIn: AdminModule,
})
export class AdminProductService {
	private productsObject = new Subject<ProductResponse[]>();
	products$ = this.productsObject.asObservable();
	constructor(private http: HttpClient) {}

	ngOnInit(): void {}

	getAll(): Observable<ProductResponse[]> {
		return this.http
			.get<ApiResponse<PagedProductResult>>(URL_API.productsUrl)
			.pipe(map(response => response.result.content));
	}

	createProduct(product: ProductRequest): Observable<ApiResponse<ProductResponse>> {
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
