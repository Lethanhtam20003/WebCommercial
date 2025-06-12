import { Injectable } from '@angular/core';
import {
	BehaviorSubject,
	Observable,
	map,
	of,
	switchMap,
} from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { AuthenticationResponse } from '../models/authentication-response.model';
import { IntrospectResponse } from '../models/introspect_response.model';
import { URL_API } from '../../shared/constants/url-api.constants';
import { ErrorMessageConstants } from '../../shared/constants/error-message.constants';
import { AlertService } from './alert.service';
import { UserStateService } from './state/user-state.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly TOKEN_KEY = 'access_token';
	private isLoggedInSubject = new BehaviorSubject<boolean>(false);
	isLoggedIn$ = this.isLoggedInSubject.asObservable();

	constructor(
		private http: HttpClient,
		private alertService: AlertService,
		private userState: UserStateService
	) {
		// Kiểm tra trạng thái đăng nhập khi service được khởi tạo
		this.checkInitialAuthState();
	}

	/**
	 * Kiểm tra trạng thái đăng nhập ban đầu
	 * @private
	 */
	private checkInitialAuthState(): void {
		const token = this.getStoredToken();
		if (token) {
			this.validateToken(token).subscribe(); // sẽ tự cập nhật login status
		} else {
			this.updateLoginStatus(false);
		}
	}

	/**
	 * Lấy token từ localStorage
	 * @private
	 */
	private getStoredToken(): string | null {
		return localStorage.getItem(this.TOKEN_KEY);
	}

	/**
	 * Cập nhật trạng thái đăng nhập
	 * @param status - Trạng thái đăng nhập mới
	 * @private
	 */
	private updateLoginStatus(status: boolean): void {
		this.isLoggedInSubject.next(status);
	}

	/**
	 * Kiểm tra xác thực người dùng
	 * @returns Observable<boolean>
	 */
	verifyAuthentication(): Observable<boolean> {
		return this.isLoggedIn$.pipe(
			take(1), //  chỉ nhận 1 giá trị duy nhất
			switchMap(isLoggedIn => {
				if (isLoggedIn) {
					return of(true); // Đã đăng nhập, không cần kiểm tra lại
				} else {
					// Return false if not logged in
					const token = this.getStoredToken();
					return this.validateToken(token);
				}
			})
		);
	}

	validateToken(token: string | null): Observable<boolean> {
		// Kiểm tra xem token có tồn tại không
		if (!token) {
			this.updateLoginStatus(false);
			return of(false);
		}

		const body = {
			token: token,
		};

		return this.http
			.post<ApiResponse<IntrospectResponse>>(URL_API.introspect, body, {
				headers: new HttpHeaders().set('skipAuth', 'true'),
			})
			.pipe(
				switchMap(res => {
					if (res.code === 200) {
						const isAuthenticated = res.result.valid;

						if (isAuthenticated) {
							this.updateLoginStatus(true);
							return of(true);
						}

						// Nếu token không hợp lệ, thử làm mới
						return this.handleTokenRefresh();
					}

					// Các code khác không phải 200
					this.updateLoginStatus(false);
					return of(false);
				}),
				catchError(() => {
					this.updateLoginStatus(false);
					return of(false);
				})
			);
	}

	/**
	 * Xử lý làm mới token
	 * @returns Observable<boolean>
	 * @private
	 */
	private handleTokenRefresh(): Observable<boolean> {
		const token = this.getStoredToken();
		if (!token) {
			return of(false);
		}

		return this.http
			.post<ApiResponse<AuthenticationResponse>>(
				URL_API.refreshTokenUrl,
				{ token },
				{
					headers: new HttpHeaders().set('skipAuth', 'true'),
				}
			)
			.pipe(
				map(res => {
					const isSuccess = res.code === 200;
					if (isSuccess) {
						localStorage.setItem(this.TOKEN_KEY, res.result.token);
						this.updateLoginStatus(true);
					} else {
						this.updateLoginStatus(false);
					}
					return isSuccess;
				}),
				catchError(() => {
					this.updateLoginStatus(false);
					return of(false);
				})
			);
	}

	/**
	 * Đăng nhập bằng Facebook
	 */
	loginWithFacebook(): void {
		// Tính toán vị trí để popup hiển thị giữa màn hình
		const width = 500;
		const height = 600;
		const left = window.screenX + (window.outerWidth - width) / 2;
		const top = window.screenY + (window.outerHeight - height) / 2;

		const popup = window.open(
			URL_API.facebookLogin,
			'_blank',
			`width=${width},height=${height},left=${left},top=${top}`
		);
		if (!popup) {
			alert(
				'Popup bị chặn bởi trình duyệt. Vui lòng cho phép popup để tiếp tục đăng nhập bằng Facebook.'
			);
			return;
		}
	}
	/**
	 * Đăng nhập bằng Google
	 */
	loginWithGoogle(): void {
		// Tính toán vị trí để popup hiển thị giữa
		const width = 500;
		const height = 600;
		const left = window.screenX + (window.outerWidth - width) / 2;
		const top = window.screenY + (window.outerHeight - height) / 2;
		const popup = window.open(
			URL_API.googleLogin,
			'_blank',
			`width=${width},height=${height},left=${left},top=${top}`
		);
		if (!popup) {
			alert(
				'Popup bị chặn bởi trình duyệt. Vui lòng cho phép popup để tiếp tục đăng nhập bằng Google.'
			);
			return;
		}
	}
	/**
	 *  đăng nhập sau khi nhận được token từ popup
	 * @param token
	 */
	loginWithToken(token: string): void {
		this.setToken(token);
		this.updateLoginStatus(true);
	}

	/**
	 * Đăng ký tài khoản
	 * @param username - Tên đăng nhập
	 * @param emailOrPhone - Email hoặc số điện thoại
	 * @param password - Mật khẩu
	 * @returns Observable<ApiResponse<AuthenticationResponse>>
	 */
	register(
		username: string,
		emailOrPhone: string,
		password: string
	): Observable<ApiResponse<AuthenticationResponse>> {
		const email = emailOrPhone.includes('@') ? emailOrPhone : null;
		const phone = emailOrPhone.includes('@') ? null : emailOrPhone;

		const body = {
			username,
			email,
			phone,
			password,
		};

		return this.http
			.post<ApiResponse<AuthenticationResponse>>(URL_API.registerUrl, body, {
				headers: new HttpHeaders().set('skipAuth', 'true'),
			})
			.pipe(
				catchError((error: HttpErrorResponse) => {
					this.updateLoginStatus(false);
					let errorMessage: string = ErrorMessageConstants.UnknownErrorOccurred;

					if (error.error?.message === 'user existed') {
						errorMessage = String(ErrorMessageConstants.userExisted);
					}
					if (error.error?.message === 'email existed') {
						errorMessage = ErrorMessageConstants.emailExisted;
					}
					if (error.error?.message === 'phone existed') {
						errorMessage = ErrorMessageConstants.phoneExisted;
					}
					return of({
						code: error.error?.code || 500,
						message: errorMessage,
						result: {} as AuthenticationResponse,
					});
				})
			);
	}

	login(
		username: string,
		password: string
	): Observable<ApiResponse<AuthenticationResponse>> {
		const body = {
			username,
			password,
		};

		return this.http
			.post<ApiResponse<AuthenticationResponse>>(URL_API.loginUrl, body, {
				headers: new HttpHeaders().set('skipAuth', 'true'),
			})
			.pipe(
				tap(res => {
					if (res.code === 200) {
						localStorage.setItem(this.TOKEN_KEY, res.result.token);
						this.updateLoginStatus(true);
					}
				}),
				catchError((error: HttpErrorResponse) => {
					this.updateLoginStatus(false);
					let errorMessage = String(ErrorMessageConstants.UnknownErrorOccurred);
					if (error.error.message === 'user not existed') {
						errorMessage = String(ErrorMessageConstants.userNotExisted);
					}
					if (error.error.message === 'password not correct') {
						errorMessage = String(ErrorMessageConstants.passwordNotCorrect);
					}
					return of({
						code: error.error.code,
						message: errorMessage,
						result: {} as AuthenticationResponse,
					});
				})
			);
	}

	/**
	 * Đăng xuất
	 */
	logout(): void {
		this.removeToken();
		this.updateLoginStatus(false);
		this.userState.clearUser();
		this.alertService.success('Đăng xuất thành công!');
	}

	/**
	 * Lưu token vào localStorage
	 * @param token - Chuỗi token cần lưu
	 */
	private setToken(token: string): void {
		localStorage.setItem(this.TOKEN_KEY, token);
	}

	/**
	 * Xóa token khỏi localStorage
	 */
	private removeToken(): void {
		localStorage.removeItem(this.TOKEN_KEY);
	}
}
