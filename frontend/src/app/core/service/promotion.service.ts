import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { PromotionResponse } from '../models/response/promotions/promotion-response.interface';
import { URL_API } from '../../shared/constants/url-api.constants';

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

	getAllPromotions(): Observable<ApiResponse<PromotionResponse[]>> {
		return this.http.get<ApiResponse<PromotionResponse[]>>(
			URL_API.promotionUrl
		);
	}
}
