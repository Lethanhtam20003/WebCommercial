import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Label } from '../../../core/constants/label.constants';
import { ErrorMessageConstants } from '../../../core/constants/error-message.constants';
import { CommonModule, NgClass } from '@angular/common';
import { RouteLink } from '../../../core/constants/route-link';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../../core/service/alert.service';
import { emailOrPhoneValidator } from '../../../shared/validations/emailOrPhoneValidator';
import { AuthService } from '../../../core/service/auth.service';


@Component({
	selector: 'register-component',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule

	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit{
	constructor(
		private router: Router,
		private alertService: AlertService,
		private fb: FormBuilder,
		private authService: AuthService,
	) {
		this.registerForm = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(3)]],
			password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
			emailOrPhone: ['', [Validators.required, emailOrPhoneValidator.bind(this)]],
			reenterpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
		});
	}
	// Constants
	ErrorMessage = ErrorMessageConstants;

	registerForm: FormGroup;
	isLoading: boolean = false;
	passwordFieldOut = false;
	reenterPasswordFieldOut = false;


	isFieldInvalid(fieldName: string): boolean {
		const field = this.registerForm.get(fieldName);
		return field ? field.invalid && (field.dirty || field.touched) : false;
	}

	isPasswordFieldOut(): void {
	  this.passwordFieldOut = true;
	}

	isPasswordFieldIn(): void {
	  this.passwordFieldOut = false;
	}

	isReenterPasswordFieldOut(): void {
	  this.reenterPasswordFieldOut = true;
	}

	getErrorMessage(fieldName: string): string {
		switch (fieldName) {
			case 'username':
				return this.getUsernameErrorMessage();
			case 'password':
				return this.getPasswordErrorMessage();
			case 'emailOrPhone':
				return this.getEmailOrPhoneErrorMessage();
			case 'reenterpassword':
				return this.getReEnterPassword();
			default:
				return '';
		}
	}
	getUsernameErrorMessage(): string{
		// if (this.registerForm.get('username')?.hasError('required')) {
		// 	return this.ErrorMessage.pleaseEnterUsername;
		// }
		if (this.registerForm.get('username')?.hasError('minlength')) {
			return this.ErrorMessage.usernameHasAtLeast3Characters;
		}
		return '';
	}
	getPasswordErrorMessage(): string{
		// if (this.registerForm.get('password')?.hasError('required')) {
		// 	return this.ErrorMessage.pleaseEnterPassword;
		// }
		if (this.registerForm.get('password')?.hasError('minlength')) {
			return this.ErrorMessage.passwordHasAtLeast8Characters;
		}
		if (this.registerForm.get('password')?.hasError('maxlength')) {
			return this.ErrorMessage.passwordHasAtMost30Characters;
		}
		return '';
	}
	getEmailOrPhoneErrorMessage(): string {
		const emailControl = this.registerForm.get('emailOrPhone');

		if (emailControl?.hasError('emailOrPhone')) {
		  return 'Vui lòng nhập đúng định dạng email hoặc số điện thoại';
		}

		return '';
	  }

	getReEnterPassword(): string{
		if (this.registerForm.get('reenterpassword')?.hasError('minlength')) {
			return this.ErrorMessage.passwordHasAtLeast8Characters;
		}
		if (this.registerForm.get('reenterpassword')?.hasError('maxlength')) {
			return this.ErrorMessage.passwordHasAtMost30Characters;
		}
		if (this.registerForm.get('reenterpassword')?.value !== this.registerForm.get('password')?.value) {
			return this.ErrorMessage.retypePasswordMustBeSame;
		}
		return '';
	}
	isPasswordSame(): boolean {
		// Chỉ kiểm tra sau khi đã rời khỏi ô mật khẩu
		if (!this.passwordFieldOut) {
		  return true; // Đừng hiện lỗi sớm
		}

		const password = this.registerForm.get('password')?.value;
		const reenter = this.registerForm.get('reenterpassword')?.value;

		if (password && reenter && password !== reenter) {
		  return false; // KHÔNG KHỚP → Hiện lỗi
		}

		return true; // Khớp hoặc chưa nhập đủ → Không lỗi
	  }

	ngOnInit(): void {
	}
	ngOnsubmit(){
		this.isLoading = true;
		if (this.registerForm.invalid) {
			this.registerForm.markAllAsTouched();
			this.isLoading = false;
			return;
		}
		const formData = this.registerForm.value;
		const { username, password, emailOrPhone } = formData;

		this.authService.register(username, emailOrPhone, password)
		.subscribe({
			next: (response) => {
				if (response.code === 200) {
					this.alertService.success('Đăng ký thành công!');
					this.isLoading = false;
					this.router.navigate([RouteLink.loginRoute], {
						state: { username: username, password: password }
					  });

				} else {
					this.isLoading = false;
					this.alertService.error(response.message || 'Đăng ký thất bại!');
				}
			},
			error: () => {
				this.isLoading = false;
				this.alertService.error('Đăng ký thất bại!');
			}
		});

	}
	loginWithGoogle(){

	}
	loginWithFacebook(){

	}
	navigateToLogin(){
		this.router.navigate([RouteLink.loginRoute]);
	}


}
