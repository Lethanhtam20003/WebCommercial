import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PromotionResponse } from '../../models/response/product-response/PromotionResponse';
import { Observable } from 'rxjs';
import { URL_API } from '../../../shared/constants/url-api.constants';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({
	providedIn: 'root',
})
export class PromotionService {
	constructor(private http: HttpClient) {}
  getAll(): Observable<ApiResponse<PromotionResponse[]>> {
    return this.http.get<ApiResponse<PromotionResponse[]>>(URL_API.promotionUrl);
  }
}
