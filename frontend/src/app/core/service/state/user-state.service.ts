import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from '../../models/response/user-profile-response.model';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../../shared/constants/url-api.constants';

@Injectable({ providedIn: 'root' })
export class UserStateService {
	private userSubject = new BehaviorSubject<UserProfile | null>(null);
	readonly user$ = this.userSubject.asObservable();

	constructor(
		private userService: UserService,
		private http: HttpClient
	) {}

	fetchUserInfo() {
		this.userService.getCurrentInfo().subscribe({
			next: user => {
				this.userSubject.next(user);
			},
			error: err => console.error('Không thể load thông tin user', err),
		});
	}

	get currentUser(): UserProfile | null {
		return this.userSubject.value;
	}

	updateUserInfo(user: UserProfile) {
		this.userSubject.next(user);
		sessionStorage.setItem('user', JSON.stringify(user));
	}

	loadUserFromStorageOrAPI(): void {
		const sessionData  = sessionStorage.getItem('user');
		if (sessionData ) {
			const parsed  = JSON.parse(sessionData );
      const user = parsed.result ? parsed.result : parsed;
			this.userSubject.next(user);
		} else {
			this.http.get<UserProfile>(URL_API.myInfo).subscribe({
				next: user => {
					this.userSubject.next(user);
					sessionStorage.setItem('user', JSON.stringify(user));
				},
				error: err => {
					console.error('Failed to load user from API', err);
				},
			});
		}
	}
}
