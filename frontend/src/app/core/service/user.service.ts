import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { URL_API } from '../../shared/constants/url-api.constants';
import { ErrorMessageConstants } from '../../shared/constants/error-message.constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../models/response/user/user-profile-response.model';
import { UserUpdateRequest } from '../models/request/user/user-update-request.inteface';
import { UserResponse } from '../models/response/user/user-response.interface';
import { UserChangePasswordRequest } from '../models/request/user/user-change-password-request.inteface';
import { Page } from '../models/response/page-response.interface';
import { GetAllUserAdminRequest } from '../models/request/user/get-all-user-request.interface';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient) {}

	getCurrentInfo(): Observable<UserProfile> {
		return this.http.get<ApiResponse<UserProfile>>(URL_API.myInfo).pipe(
			map(response => {
				if (response.code !== 200) {
					throw new Error(
						response.message || ErrorMessageConstants.errorInGettingUserInfo
					);
				}
				const user = response.result;

				// Nếu authProvider là GOOGLE thì gán username vào firstName
				if (user.authProvider === 'GOOGLE') {
					user.fullName = user.username;
					user.username = '';
				}

				return user;
			}),
			catchError(err => {
				console.error(`${ErrorMessageConstants.errorInGettingUserInfo}:`, err);
				return throwError(
					() => new Error(ErrorMessageConstants.cannotLoadUserInfo)
				);
			})
		);
	}

	updateUser(
		userId: number,
		request: UserUpdateRequest
	): Observable<ApiResponse<UserResponse>> {
		return this.http.put<ApiResponse<UserResponse>>(
			`${URL_API.myInfo}/${userId}`,
			request
		);
	}
	updateUserForCheckout(
		user: UserProfile,
		username: string,
		phone: string,
		address: string
	): Observable<ApiResponse<UserResponse>> {
		const userRequest: UserUpdateRequest = {
			fullName: username,
			phone: phone,
			address: address,
		};

		return this.http.put<ApiResponse<UserResponse>>(
			`${URL_API.myInfo}/${user.id}`,
			userRequest
		);
	}

	changePasswordUser(
		userId: number,
		request: UserChangePasswordRequest
	): Observable<ApiResponse<UserResponse>> {
		return this.http.put<ApiResponse<UserResponse>>(
			`${URL_API.changePassword}/${userId}`,
			request
		);
	}

	getAllUsersAdmin(
	request: GetAllUserAdminRequest
): Observable<ApiResponse<Page<UserResponse>>> {
	return this.http.post<ApiResponse<Page<UserResponse>>>(
		URL_API.userFilterAdmin,
		request
	);
}

	banUser(userId: number): Observable<ApiResponse<UserResponse>> {
		return this.http.delete<ApiResponse<UserResponse>>(
			`${URL_API.users}/${userId}`
		);
	}
}
