import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { category } from '../../../core/models/response/product-response/category';
import { Observable } from 'rxjs';
import { URL_API } from '../../../shared/constants/url-api.constants';
import { CategoriesAdminFilterRequest } from '../../../core/models/request/category/categories-admin-filter-request.interface';
import { Page } from '../../../core/models/response/page-response.interface';
import { CategoriesAdminFilterResponse } from '../../../core/models/response/category/categories-admin-filter-response.interface';
import { ApiResponse } from '../../../core/models/api-response.model';
import { CreateCategoryRequest } from '../../../core/models/request/category/create-category-request.interface';
import { UpdateCategoryRequest } from '../../../core/models/request/category/update-category-request.interface';

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
	createCategory(category: CreateCategoryRequest): Observable<ApiResponse<category>> {
		return this.http.post<ApiResponse<category>>(URL_API.createCategory, category);
	}

  updateCategory(category: UpdateCategoryRequest): Observable<ApiResponse<category>> {
    return this.http.put<ApiResponse<category>>(`${URL_API.catogoryUrl}/${category.id}`, category);
  }
  deleteCategory(id: number): Observable<ApiResponse<category>> {
    return this.http.delete<ApiResponse<category>>(`${URL_API.catogoryUrl}/${id}`);
  }
}
