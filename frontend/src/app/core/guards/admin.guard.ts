import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RoleService } from '../service/authencationService/role.service';
import { catchError, Observable, of, switchMap, take } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AdminGuard implements CanActivate {
	constructor(private roleService: RoleService) {}

	canActivate(): Observable<boolean> {
		return this.roleService.role$.pipe(
			take(1), // Lấy đúng 1 lần giá trị role rồi dừng
			switchMap(role => {
				if (role === 'ADMIN') {
					return of(true);
				} else {
					return this.roleService.checkRoleAdmin().pipe(take(1)); // cũng chỉ lấy 1 lần
				}
			}),
			catchError(() => of(false))
		);
	}
}
