import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../shared/constants/url-api.constants';

@Injectable({
	providedIn: 'root',
})
export class AddressService {
	constructor(private http: HttpClient) {}

	getProvinces() {
		return this.http.get<any[]>(`${URL_API.baseUrl}/address/provinces`);
	}

	getDistricts(provinceCode: number) {
		return this.http.get<any>(`${URL_API.baseUrl}/address/districts/${provinceCode}`);
	}

	getWards(districtCode: number) {
		return this.http.get<any>(`${URL_API.baseUrl}/address/wards/${districtCode}`);
	}
}
