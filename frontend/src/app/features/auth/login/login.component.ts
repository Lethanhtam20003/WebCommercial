import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LabelConstants } from '../../../core/constants/label.constants';
import { ErrorMessageConstants } from '../../../core/constants/error-message.constants';
import { NgClass, NgIf, CommonModule } from '@angular/common';
import { RouteLink } from '../../../core/constants/route-link';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { PopupMessageService } from '../../../core/service/popup-message.service';
import { AuthService } from '../../../core/service/auth.service';
import { AlertService } from '../../../core/service/alert.service';

@Component({
	selector: 'login-component',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
	private cleanup: (() => void) | null = null;
	returnUrl: string = '/';
	constructor(
		private router: Router,
		private popupMessageService: PopupMessageService,
		private authService: AuthService,
		private alertService: AlertService,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) {
		this.loginForm = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(3)]],
			password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
		});
	}
	/*
	 * @description: value for username and password in input
	 * */
	username: string = '';
	password: string = '';

	/*
	 * @description: id for username and password input
	 * */
	readonly usernameInputId: string = 'username';
	readonly passwordInputId: string = 'password';

	/*
	 * @description: state for username and password input
	 * */
	usernameIsFocused: boolean = false;
	passwordIsFocused: boolean = false;

	/*
	 * @description: set focus for username input
	 * */
	@ViewChild('usernameInput') usernameInput!: ElementRef;

	// Constants
	Label = LabelConstants;
	ErrorMessage = ErrorMessageConstants;
	RouteLink = RouteLink;

	// Form controls
	loginForm: FormGroup;
	
	// Biến hiển thị loading
	isLoading: boolean = false;

	ngAfterViewInit() {
		if (this.usernameInput) {
			this.usernameInput.nativeElement.addEventListener('focus', () => {
				this.setFocus('username', true);
			});
			this.usernameInput.nativeElement.addEventListener('blur', () => {
				this.setFocus('username', false);
			});
		}
	}

	/*
	 * @description: event handler set focus for input
	 * */
	setFocus(field: string, isFocused: boolean) {
		if (field === 'username') {
			this.usernameIsFocused = isFocused;
		} else if (field === 'password') {
			this.passwordIsFocused = isFocused;
		}
	}

	ngOnInit() {
		// Bắt đầu lắng nghe token
		this.cleanup = this.popupMessageService.listenForToken();
		this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
	}

	/**
	 * Kiểm tra trường có lỗi validation không
	 * @param fieldName Tên trường cần kiểm tra
	 * @returns true nếu trường có lỗi
	 */
	isFieldInvalid(fieldName: string): boolean {
		const field = this.loginForm.get(fieldName);
		return field ? field.invalid && (field.dirty || field.touched) : false;
	}

	/**
	 * Lấy thông báo lỗi cho trường
	 * @param fieldName Tên trường cần lấy thông báo lỗi
	 * @returns Thông báo lỗi tương ứng
	 */
	getErrorMessage(fieldName: string): string {
		const field = this.loginForm.get(fieldName);
		if (!field) return '';

		if (field.hasError('required')) {
			return fieldName === 'username' 
				? this.ErrorMessage.pleaseEnterUsername 
				: this.ErrorMessage.pleaseEnterPassword;
		}

		if (fieldName === 'username' && field.hasError('minlength')) {
			return this.ErrorMessage.usernameHasAtLeast3Characters;
		}

		if (fieldName === 'password') {
			if (field.hasError('minlength') || field.hasError('maxlength')) {
				return this.ErrorMessage.passwordHasAtLeast8CharactersAndSmallerThan30;
			}
		}

		return '';
	}

	/**
	 * Xử lý sự kiện đăng nhập khi người dùng submit form
	 */
	ngOnsubmit() {
		if (this.loginForm.invalid) {
			return;
		}
		
		this.isLoading = true;
		const formValues = this.loginForm.value;
		
		// Sử dụng giá trị từ form thay vì biến class
		this.authService.login(formValues.username, formValues.password).subscribe(
			res => {
				this.isLoading = false;
				if (res.code === 200) {
					this.alertService.success('Đăng nhập thành công!');
					this.router.navigate([this.returnUrl]);
				} else {
					this.alertService.warning(res.message || 'Có lỗi xảy ra, vui lòng thử lại!');
				}
			},
			(error: any) => {
				this.isLoading = false;
				this.alertService.warning('Đăng nhập thất bại! Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
			}
		);
	}

	ngOnDestroy() {
		// Dọn dẹp listener khi component bị hủy
		if (this.cleanup) {
			this.cleanup();
		}
	}

	/**
	 * Xử lý đăng nhập bằng Facebook
	 */
	loginWithFacebook() {
		this.authService.loginWithFacebook();
	}

	/**
	 * Xử lý đăng nhập bằng Google
	 */
	loginWithGoogle(): void {
		// Hiển thị thông báo đang phát triển
		this.alertService.warning('Chức năng đăng nhập bằng Google đang được phát triển!');
	}
	
	/**
	 * Chuyển hướng đến trang đăng ký
	 */
	navigateToRegister(): void {
		this.router.navigate(['/register']);
	}
}
