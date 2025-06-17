import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { category } from '../../../core/models/response/product-response/category';
import { Observable } from 'rxjs';
import { URL_API } from '../../../shared/constants/url-api.constants';
import { AdminModule } from '../admin.module';
import { CategoriesAdminFilterRequest } from '../../../core/models/request/category/categories-admin-filter-request.interface';
import { Page } from '../../../core/models/response/page-response.interface';
import { CategoriesAdminFilterResponse } from '../../../core/models/response/category/categories-admin-filter-response.interface';
import { ApiResponse } from '../../../core/models/api-response.model';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	constructor(private http: HttpClient) {}

	getAll(): Observable<category[]> {
		return this.http.get<category[]>(URL_API.catogoryUrl);
	}
	getCategoryById(id: number): Observable<category> {
		return this.http.get<category>(`${URL_API.catogoryUrl}/${id}`);
	}
	filterCategories(
		request: CategoriesAdminFilterRequest
	): Observable<ApiResponse<Page<CategoriesAdminFilterResponse>>> {
    const params = new HttpParams()
          .set('page', request.page.toString())
          .set('size', request.size.toString());

        const { page, size, ...filter } = request;

		return this.http.post<ApiResponse<Page<CategoriesAdminFilterResponse>>>(
			URL_API.categoryFilter,
			filter,
			{ params }
		);
	}
}
