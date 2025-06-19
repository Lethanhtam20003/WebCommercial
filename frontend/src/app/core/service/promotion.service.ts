import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { PromotionResponse } from '../models/response/promotions/promotion-response.interface';
import { URL_API } from '../../shared/constants/url-api.constants';
import { Page } from '../models/response/page-response.interface';
import { GetAllPromotionAdminRequest } from '../models/request/promotion/get-all-promotion-admin-request.interface';
import { formatDate } from '@angular/common';

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
		const { page, size, ...body } = request;

		// Format date nếu là object Date
		const formattedBody = {
			...body,
			startDateFrom: body.startDateFrom
				? formatDate(body.startDateFrom, 'yyyy-MM-dd', 'en-US')
				: null,
			endDateTo: body.endDateTo
				? formatDate(body.endDateTo, 'yyyy-MM-dd', 'en-US')
				: null,
		};

		const params = new HttpParams()
			.set('page', page.toString())
			.set('size', size.toString());

		return this.http.post<ApiResponse<Page<PromotionResponse>>>(
			URL_API.promotionFilter,
			formattedBody,
			{ params }
		);
	}
}
