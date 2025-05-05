import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { LabelConstants } from '../../../core/constants/label.constants';
import { ErrorMessageConstants } from '../../../core/constants/error-message.constants';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
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
		PasswordModule,
		FloatLabel,
		InputText,
		ButtonModule,
		NgClass,
		RouterLink,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	private cleanup: (() => void) | null = null;
	returnUrl: string = '/';
	constructor(
		private router: Router,
		private popupMessageService: PopupMessageService,
		private authService: AuthService,
		private alertService: AlertService,
		private route: ActivatedRoute
	) {}
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

	protected readonly Label = LabelConstants;
	protected readonly ErrorMessage = ErrorMessageConstants;
	protected readonly RouteLink = RouteLink;

	ngOnInit() {
		// Bắt đầu lắng nghe token
		this.cleanup = this.popupMessageService.listenForToken();
		this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
	}
	ngOnsubmit() {
		// Xử lý sự kiện khi người dùng nhấn nút đăng nhập
		this.authService.login(this.username, this.password).subscribe(
			res => {
				if (res.code === 200) {
					this.alertService.success('Đăng nhập thành công!');
					this.router.navigate([this.returnUrl]);
				} else {
					this.alertService.warning(res.message || 'Unknown error occurred.');
				}
			},
			(error: any) => {
				this.alertService.warning('Đăng nhập thất bại!');
			}
		);
	}

	ngOnDestroy() {
		// Dọn dẹp listener khi component bị hủy
		if (this.cleanup) {
			this.cleanup();
		}
	}
	loginWithFacebook() {
		this.authService.loginWithFacebook();
	}
}
