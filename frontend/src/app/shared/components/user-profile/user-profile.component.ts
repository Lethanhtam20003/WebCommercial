import { Component, OnInit } from '@angular/core';
import { Label } from '../../../core/constants/label.constants';
import {
	FormBuilder,
	FormControl,
	FormControlState,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ErrorMessageConstants } from '../../../core/constants/error-message.constants';
import { CommonModule } from '@angular/common';
import { UserProfileFormFields } from './user-profile.interface';

@Component({
	selector: 'user-profile',
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './user-profile.component.html',
	styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
	updateInformationForm!: FormGroup;
	imagePreview: string | ArrayBuffer | null = null;
	protected readonly label = Label;
	protected readonly errorMessage = ErrorMessageConstants;

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.updateInformationForm = this.fb.group({
			username: new FormControl<string>(
				{ value: 'username', disabled: true },
				Validators.required
			),
			email: new FormControl<string>('name@example.com', [
				Validators.required,
				Validators.email,
			]),
			fullName: new FormControl<string>('full-name', Validators.required),
			profileImage: new FormControl<File | null>(null),
			address: new FormControl<string>('San Francisco, CA'),
			phoneNum: new FormControl<string>('555-123-4567', Validators.required),
			birthday: new FormControl<string>('06/10/1988'),
			gender: new FormControl<string>(this.label.male, Validators.required),
		}) as FormGroup<UserProfileFormFields>;
	}

	onSubmit(): void {
		if (this.updateInformationForm.invalid) {
			if (this.updateInformationForm.get('gender')?.hasError('required')) {
				Swal.fire({
					icon: 'error',
					title: ErrorMessageConstants.meetAnError,
					text: ErrorMessageConstants.genderIsNotEmpty + '!',
				});
			}
		} else {
			Swal.fire({
				title: this.label.onWorkingProcess,
				html: this.label.pleaseWaitAMinute,
				timer: 3000,
				timerProgressBar: true,
				allowOutsideClick: false,
				didOpen: () => {
					Swal.showLoading();
				},
			}).then(result => {
				/* Read more about handling dismissals below */
				if (result.dismiss === Swal.DismissReason.timer) {
					console.log('I was closed by the timer');
				}
			});
		}
	}

	onFileSelected(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;

		const maxSizeInMB = 5;
		const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
		const allowedTypes = ['image/png', 'image/jpeg'];

		if (file.size > maxSizeInBytes) {
			Swal.fire({
				icon: 'error',
				title: ErrorMessageConstants.cannotUploadImage,
				text: ErrorMessageConstants.imageIsOversized + '!',
			});

			this.updateInformationForm.patchValue({ profileImage: null });
			this.imagePreview = null;
			return;
		}

		if (!allowedTypes.includes(file.type)) {
			Swal.fire({
				icon: 'error',
				title: ErrorMessageConstants.cannotUploadImage,
				text: ErrorMessageConstants.imageIsNotInAllowedType + '!',
			});

			this.updateInformationForm.patchValue({ profileImage: null });
			this.imagePreview = null;
			return;
		}

		this.updateInformationForm.patchValue({ profileImage: file });
		this.updateInformationForm.get('profileImage')?.updateValueAndValidity();

		const reader = new FileReader();
		reader.onload = () => {
			this.imagePreview = reader.result;
		};
		reader.readAsDataURL(file);
	}

	get isUsernameRequiredInvalid(): boolean {
		const usernameField = this.updateInformationForm.get('username');
		return !!(usernameField?.touched && usernameField.hasError('required'));
	}

	get isFullNameRequiredValid(): boolean {
		const fullNameField = this.updateInformationForm.get('fullName');
		return !!(fullNameField?.touched && fullNameField.hasError('required'));
	}

	get isGenderRequiredValid(): boolean {
		const genderField = this.updateInformationForm.get('gender');
		return !!(genderField?.touched && genderField.hasError('required'));
	}

  get isPhoneNumRequiredValid(): boolean {
    const phoneNumField = this.updateInformationForm.get('phoneNum');
    return !!(phoneNumField?.touched && phoneNumField.hasError('required'));
  }

	get emailControl() {
		return this.updateInformationForm.get('email');
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
