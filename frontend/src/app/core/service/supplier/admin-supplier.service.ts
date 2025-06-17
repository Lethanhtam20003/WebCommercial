import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupplierResponse } from '../../models/response/supplier-response/SupplierResponse';
import { ApiResponse } from '../../models/api-response.model';
import { URL_API } from '../../../shared/constants/url-api.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageResponse } from '../../models/response/product-response/product-response/page-response.interface';

@Injectable({
	providedIn: 'root',
})
export class AdminSupplierService {
	private suppliersSubject  = new BehaviorSubject<SupplierResponse[]>([]);
	listSuppliers$ = this.suppliersSubject.asObservable();

	constructor(private http: HttpClient) {}

	fetchSuppliers() {
		this.http
			.get<ApiResponse<PageResponse<SupplierResponse>>>(URL_API.suppliers)
			.subscribe({
				next: response => {
					if (response.code === 200 && response.result) {
						console.log(response.result);
						this.suppliersSubject.next(response.result.content);
					}
				},
				error: error => {
					console.error('Error fetching products:', error);
				},
			});
	}

	getSupplierById(id: number): Observable<ApiResponse<SupplierResponse>> {
		return this.http.get<ApiResponse<SupplierResponse>>(
			`${URL_API.suppliers}/${id}`
		);
	}
}
