import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllCouponRequest } from '../models/request/coupon/get-all-coupon-request.interface';
import { ApiResponse } from '../models/api-response.model';
import { Page } from '../models/response/page-response.interface';
import { CouponResponse } from '../models/response/coupon/coupon-response.interface';
import { URL_API } from '../../shared/constants/url-api.constants';
import { Observable } from 'rxjs';
import { AdminCouponResponse } from '../models/response/coupon/admin-coupon-response.interface';
import { CouponCreateRequest } from '../models/request/coupon/coupon-create-request.interface';

@Injectable({
	providedIn: 'root',
})
export class CouponService {
	constructor(private http: HttpClient) {}

	getAllCoupons(
		request: GetAllCouponRequest
	): Observable<ApiResponse<Page<CouponResponse>>> {
		const params = new HttpParams()
			.set('page', request.page.toString())
			.set('size', request.size.toString());

		return this.http.get<ApiResponse<Page<CouponResponse>>>(
			URL_API.getAllCouponsUser,
			{ params }
		);
	}

	getAllCouponsForAdmin(
		request: GetAllCouponRequest
	): Observable<ApiResponse<Page<AdminCouponResponse>>> {
		const params = new HttpParams()
			.set('page', request.page.toString())
			.set('size', request.size.toString());

		const { page, size, ...filter } = request;

		return this.http.post<ApiResponse<Page<AdminCouponResponse>>>(
			URL_API.getAllCouponsFilterAdmin,
      filter,
			{ params }
		);
	}

  createCoupon(request: CouponCreateRequest): Observable<ApiResponse<CouponResponse>> {
    console.log(request);

    return this.http.post<ApiResponse<CouponResponse>>(URL_API.coupon, request);
  }
}
