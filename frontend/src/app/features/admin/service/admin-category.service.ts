import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { category } from '../../../core/models/response/product-response/category';
import { Observable } from 'rxjs';
import { URL_API } from '../../../shared/constants/url-api.constants';
import { AdminModule } from '../admin.module';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<category[]> {
    return this.http.get<category[]>(URL_API.catogoryUrl);
  }
  getCategoryById(id: number): Observable<category> {
    return this.http.get<category>(`${URL_API.catogoryUrl}/${id}`);
  }

}
