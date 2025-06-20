import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { PromotionResponse } from '../models/response/promotions/promotion-response.interface';
import { URL_API } from '../../shared/constants/url-api.constants';
import { Page } from '../models/response/page-response.interface';
import { GetAllPromotionAdminRequest } from '../models/request/promotion/get-all-promotion-admin-request.interface';
import { formatDate } from '@angular/common';
import { CreatePromotionRequest } from '../models/response/promotions/create-promotion-request.interface';

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
		const formattedRequest: GetAllPromotionAdminRequest = {
			...request,
			startDateFrom: request.startDateFrom
				? formatDate(request.startDateFrom, 'yyyy-MM-dd', 'en-US')
				: undefined,
			endDateTo: request.endDateTo
				? formatDate(request.endDateTo, 'yyyy-MM-dd', 'en-US')
				: undefined,
		};

		return this.http.post<ApiResponse<Page<PromotionResponse>>>(
			URL_API.promotionFilter,
			formattedRequest
		);
	}

	createPromotion(
		request: CreatePromotionRequest
	): Observable<ApiResponse<PromotionResponse>> {
		return this.http.post<ApiResponse<PromotionResponse>>(
			URL_API.promotionUrl,
			request
		);
	}

	deletePromotion(
		promotionId: number
	): Observable<ApiResponse<PromotionResponse>> {
		return this.http.delete<ApiResponse<PromotionResponse>>(
			`${URL_API.promotionUrl}/${promotionId}`
		);
	}
}
