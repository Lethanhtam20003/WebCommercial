import { AlertService } from './../../../core/service/alert.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { LabelConstants } from '../../constants/label.constants';
import { ErrorMessageConstants } from '../../constants/error-message.constants';
import { UserStateService } from '../../../core/service/user-state.service';
import { UserChangePasswordRequest } from '../../../features/user/models/user-change-password.inteface';
import { UserService } from '../../../core/service/user.service';
import { ResponseMessage } from '../../constants/response-message.constants';

@Component({
	selector: 'change-password',
	imports: [NgIf, CommonModule, ReactiveFormsModule],
	templateUrl: './change-password.component.html',
	styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
	updatePasswordForm!: FormGroup;
	protected readonly label = LabelConstants;
	protected readonly errorMessage = ErrorMessageConstants;

	constructor(
		private fb: FormBuilder,
		private alert: AlertService,
		private userState: UserStateService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.updatePasswordForm = this.fb.group(
			{
				email: new FormControl<string>({ value: '', disabled: true }, [
					Validators.required,
					Validators.email,
				]),
				oldPassword: new FormControl<string>('', [
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(30),
				]),
				newPassword: new FormControl<string>('', [
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(30),
				]),
				retypePassword: new FormControl<string>('', [Validators.required]),
			},
			{ validators: [this.passwordsMatchValidator] }
		) as FormGroup<ChangePasswordFormFields>;

		const user = this.userState.currentUser;

		if (user) {
			this.updatePasswordForm.patchValue({ email: user.email });
		} else {
			this.userState.fetchUserInfo(); // nếu chắc chắn người dùng đã login
			this.userState.user$.subscribe({
				next: user => {
					if (user) {
						this.updatePasswordForm.patchValue({ email: user.email });
					}
				},
			});
		}
	}

	onSubmit(): void {
		const formValue = this.updatePasswordForm.getRawValue();

		const request: UserChangePasswordRequest = {
			email: formValue.email,
			oldPassword: formValue.oldPassword,
			newPassword: formValue.newPassword,
		};

		const userId = this.userState.currentUser?.id;
		if (!userId) {
			this.alert.error(ErrorMessageConstants.userNotExisted);
			return;
		}

		this.alert.loading(
			this.label.pleaseWaitAMinute,
			this.label.onWorkingProcess
		);

		this.userService.changePasswordUser(userId, request).subscribe({
			next: () => {
				this.alert.success(ResponseMessage.changePasswordSuccess);
				this.updatePasswordForm.reset({
					email: this.emailControl?.value, // giữ nguyên giá trị email
					oldPassword: '',
					newPassword: '',
					retypePassword: '',
				});
			},
			error: err => {
				this.alert.error(ErrorMessageConstants.changePasswordFail);
				console.error(err);
			},
		});
	}

	passwordsMatchValidator(formGroup: FormGroup): ValidationErrors | null {
		const newPassword = formGroup.get('newPassword')?.value;
		const retypePassword = formGroup.get('retypePassword')?.value;

		if (newPassword && retypePassword && newPassword !== retypePassword) {
			return { passwordsDoNotMatch: true };
		}

		return null;
	}

	// --- OLD PASSWORD ---
	get oldPasswordControl() {
		return this.updatePasswordForm.get('oldPassword');
	}
	get isOldPasswordInvalid(): boolean {
		return !!(
			this.oldPasswordControl?.touched && this.oldPasswordControl.invalid
		);
	}
	get isOldPasswordRequired(): boolean {
		return !!this.oldPasswordControl?.hasError('required');
	}
	get oldPasswordTooShort(): boolean {
		return !!this.oldPasswordControl?.hasError('minlength');
	}

	get oldPasswordTooLong(): boolean {
		return !!this.oldPasswordControl?.hasError('maxlength');
	}

	// --- NEW PASSWORD ---
	get newPasswordControl() {
		return this.updatePasswordForm.get('newPassword');
	}

	get isNewPasswordInvalid(): boolean {
		return !!(
			this.newPasswordControl?.touched && this.newPasswordControl.invalid
		);
	}

	get isNewPasswordRequired(): boolean {
		return !!this.newPasswordControl?.hasError('required');
	}

	get newPasswordTooShort(): boolean {
		return !!this.newPasswordControl?.hasError('minlength');
	}

	get newPasswordTooLong(): boolean {
		return !!this.newPasswordControl?.hasError('maxlength');
	}

	// --- RETYPE PASSWORD ---
	get showPasswordMismatch(): boolean {
		return this.updatePasswordForm.errors?.['passwordsDoNotMatch'] ?? false;
	}
	get isRetypePasswordRequiredInvalid(): boolean {
		const retypePasswordField = this.updatePasswordForm.get('retypePassword');
		return !!(
			retypePasswordField?.touched && retypePasswordField.hasError('required')
		);
	}

	// --- EMAIL ---
	get emailControl() {
		return this.updatePasswordForm.get('email');
	}

	get showEmailErrors(): boolean {
		return !!(this.emailControl?.touched && this.emailControl?.invalid);
	}

	get isEmailRequired(): boolean {
		return this.emailControl?.hasError('required') ?? false;
	}

	get isEmailInvalid(): boolean {
		return this.emailControl?.hasError('email') ?? false;
	}
}
interface ChangePasswordFormFields {
	email: FormControl<string>;
	oldPassword: FormControl<string>;
	newPassword: FormControl<string>;
	retypePassword: FormControl<string>;
}
