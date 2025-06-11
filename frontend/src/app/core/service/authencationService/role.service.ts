import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Role } from '../../enum/role.enum';
import { AuthService } from '../auth.service';
import { ApiResponse } from '../../models/api-response.model';
import { URL_API } from '../../../shared/constants/url-api.constants';

@Injectable({
	providedIn: 'root',
})
export class RoleService {
	private roleSubject = new BehaviorSubject<Role | null>(null);
	role$ = this.roleSubject.asObservable();

	constructor(
		private http: HttpClient,
		private authService: AuthService
	) {}

	private updateRole(role: Role | null): void {
		this.roleSubject.next(role);
	}

	checkRoleAdmin(): Observable<boolean> {
	if (!this.authService.isLoggedIn$) {
		this.updateRole(null);
		return of(false);
	}

	return this.http.get<ApiResponse<boolean>>(URL_API.checkRoleAdmin).pipe(
		map(res => {
			if (res.code === 200 && res.result) {
				this.updateRole(Role.ADMIN);
				return true;
			}
			this.updateRole(null);
			return false;
		}),
		catchError(() => {
			this.updateRole(null);
			return of(false);
		})
	);
}

}


