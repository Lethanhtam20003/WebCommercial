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
import { ChangePasswordFormFields } from './change-password.interface';
import { LabelConstants } from '../../constants/label.constants';
import { ErrorMessageConstants } from '../../constants/error-message.constants';

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

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.updatePasswordForm = this.fb.group(
			{
				username: new FormControl<string>(
					{ value: 'username', disabled: true },
					Validators.required
				),
				email: new FormControl<string>(
					{ value: 'name@example.com', disabled: true },
					[Validators.required, Validators.email]
				),
				password: new FormControl<string>('', [
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(30),
				]),
				retypePassword: new FormControl<string>('', [Validators.required]),
			},
			{ validators: [this.passwordsMatchValidator] }
		) as FormGroup<ChangePasswordFormFields>;
	}

	onSubmit(): void {
		Swal.fire({
			title: this.label.onWorkingProcess,
			html: this.label.pleaseWaitAMinute,
			timer: 3000,
			timerProgressBar: true,
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading(null);
			},
		}).then(result => {
			/* Read more about handling dismissals below */
			if (result.dismiss === Swal.DismissReason.timer) {
				console.log('I was closed by the timer');
			}
		});
	}

	passwordsMatchValidator(formGroup: FormGroup): ValidationErrors | null {
		const password = formGroup.get('password')?.value;
		const retypePassword = formGroup.get('retypePassword')?.value;

		if (password && retypePassword && password !== retypePassword) {
			return { passwordsDoNotMatch: true };
		}

		return null;
	}

	get showPasswordMismatch(): boolean {
		return this.updatePasswordForm.errors?.['passwordsDoNotMatch'] ?? false;
	}

	get passwordControl() {
		return this.updatePasswordForm.get('password');
	}

	get passwordLengthTooShort(): boolean {
		return this.passwordControl?.hasError('minlength') ?? false;
	}

	get passwordLengthTooLong(): boolean {
		return this.passwordControl?.hasError('maxlength') ?? false;
	}

	get isPasswordInvalid(): boolean {
		return !!(this.passwordControl?.touched && this.passwordControl.invalid);
	}

	get isPasswordRequired(): boolean {
		return !!this.passwordControl?.hasError('required');
	}

	get isRetypePasswordRequiredInvalid(): boolean {
		const retypePasswordField = this.updatePasswordForm.get('retypePassword');
		return !!(
			retypePasswordField?.touched && retypePasswordField.hasError('required')
		);
	}

	get isUsernameRequiredInvalid(): boolean {
		const usernameField = this.updatePasswordForm.get('username');
		return !!(usernameField?.touched && usernameField.hasError('required'));
	}

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
