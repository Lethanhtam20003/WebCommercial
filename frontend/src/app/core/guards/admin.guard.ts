import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RoleService } from '../service/authencationService/role.service';
import { catchError, Observable, of, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AdminGuard implements CanActivate {
	constructor(private roleService: RoleService) {}

	canActivate(): Observable<boolean> {
	return this.roleService.role$.pipe(
		switchMap(role => {
			if (role === 'ADMIN') {
				return of(true);
			} else {
				return this.roleService.checkRoleAdmin(); // đã trả về Observable<boolean>
			}
		}),
		catchError(() => of(false))
	);
}

}
