import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductResponse } from '../models/productResponse';
import { map, Observable, Subject } from 'rxjs';
import { URL_API } from '../../../shared/constants/url-api.constants';
import { ApiResponse } from '../models/ApiResponse';
import { AdminModule } from '../admin.module';

@Injectable({
  providedIn: AdminModule
  
})
export class AdminProductService {
private productsObject = new Subject<ProductResponse[]>();
products$ = this.productsObject.asObservable();
constructor(private http: HttpClient) { }

ngOnInit(): void {
}

getAll(): Observable<ProductResponse[]> {
  return this.http.get<ApiResponse>(URL_API.getAllProduct).pipe(
    map(response => response.result.content)
  );
}


  

}
