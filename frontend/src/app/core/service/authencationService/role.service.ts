import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Role } from '../../enum/role.enum';
import { AuthService } from '../auth.service';
import { ApiResponse } from '../../models/api-response.model';
import { URL_API } from '../../../shared/constants/url-api.constants';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class RoleService {
	private roleSubject = new BehaviorSubject<Role | null>(null);
	role$ = this.roleSubject.asObservable();

	constructor(
		private http: HttpClient,
		private authService: AuthService,
		private router: Router
	) {}

	private updateRole(role: Role | null): void {
		this.roleSubject.next(role);
	}

	checkRoleAdmin(): Observable<boolean> {
		if (this.roleSubject.value === Role.ADMIN) {
			return of(true);
		}
		return this.callCheckRoleAdmin().pipe(
			map(res => {
				if (res) {
					this.updateRole(Role.ADMIN);
					return true;
				} else {
					this.updateRole(Role.USER);
					this.redirect403();
					return false;
				}
			}),
			catchError(() => {
				this.updateRole(null);
				this.redirect403();
				return of(false);
			})
		);
	}

	callCheckRoleAdmin(): Observable<boolean> {
		return this.http.get<ApiResponse<boolean>>(URL_API.checkRoleAdmin).pipe(
			map(res => {
				if (res.code === 200 && res.result) {
					return true;
				}
				return false;
			}),
			catchError(() => {
				return of(false);
			})
		);
	}
	redirect403(): Observable<boolean> {
		this.router.navigate(['/403']);
		return of(false);
	}
}
