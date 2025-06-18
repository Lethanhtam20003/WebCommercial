import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { PromotionResponse } from '../models/response/promotions/promotion-response.interface';
import { URL_API } from '../../shared/constants/url-api.constants';
import { Page } from '../models/response/page-response.interface';
import { GetAllPromotionAdminRequest } from '../models/request/promotion/get-all-promotion-admin-request.interface';

@Injectable({
	providedIn: 'root',
})
export class PromotionService {
	constructor(private http: HttpClient) {}

	getActivePromotions(): Observable<ApiResponse<PromotionResponse[]>> {
		return this.http.get<ApiResponse<PromotionResponse[]>>(
			URL_API.avtivePromotionUrl
		);
	}

	getAllPromotionsFilter(
		request: GetAllPromotionAdminRequest
	): Observable<ApiResponse<Page<PromotionResponse>>> {
		const params = new HttpParams()
			.set('page', request.page.toString())
			.set('size', request.size.toString());

		const { page, size, ...body } = request;

		return this.http.post<ApiResponse<Page<PromotionResponse>>>(
			URL_API.promotionFilter,
			body,
			{ params }
		);
	}
}
