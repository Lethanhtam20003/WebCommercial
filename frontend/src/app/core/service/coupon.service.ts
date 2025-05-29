import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllCouponRequest } from '../models/request/get-all-coupon-request.interface';
import { ApiResponse } from '../models/api-response.model';
import { Page } from '../models/response/page-response.interface';
import { GetAllCouponResponse } from '../models/response/get-all-coupon-response.interface';
import { URL_API } from '../../shared/constants/url-api.constants';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CouponService {
	constructor(private http: HttpClient) {}

	getAllCoupons(
		request: GetAllCouponRequest
	): Observable<ApiResponse<Page<GetAllCouponResponse>>> {
		const params = new HttpParams()
			.set('page', request.page.toString())
			.set('size', request.size.toString());

		return this.http.get<ApiResponse<Page<GetAllCouponResponse>>>(
			URL_API.getAllCoupons,
			{ params }
		);
	}
}
