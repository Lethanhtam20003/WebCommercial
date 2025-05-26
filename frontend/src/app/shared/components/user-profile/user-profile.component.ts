import { Component, OnInit } from '@angular/core';
import { LabelConstants } from '../../../shared/constants/label.constants';
import {
	FormBuilder,
	FormControl,
	FormControlState,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ErrorMessageConstants } from '../../../shared/constants/error-message.constants';
import { CommonModule } from '@angular/common';
import { UserProfileFormFields } from './user-profile.interface';
import { AlertService } from '../../../core/service/alert.service';
import { CloudinaryUploadService } from '../../../features/admin/service/cloudinary-upload.service';

@Component({
	selector: 'user-profile',
	imports: [CommonModule, ReactiveFormsModule],
	providers: [CloudinaryUploadService],
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
	updateInformationForm!: FormGroup;
	imagePreview: string | ArrayBuffer | null = null;
	protected readonly label = LabelConstants;
	protected readonly errorMessage = ErrorMessageConstants;

	constructor(
		private fb: FormBuilder,
		private alert: AlertService,
		private cloudinary: CloudinaryUploadService
	) {}

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
				this.alert.error(
					ErrorMessageConstants.genderIsNotEmpty + '!',
					ErrorMessageConstants.meetAnError
				);
			}
		} else {
			this.alert.loading(
				this.label.pleaseWaitAMinute,
				this.label.onWorkingProcess
			);
		}
	}

	onFileSelected(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;

		const maxSizeInMB = 5;
		const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
		const allowedTypes = ['image/png', 'image/jpeg'];

		if (file.size > maxSizeInBytes) {
			this.alert.error(
				ErrorMessageConstants.imageIsOversized + '!',
				ErrorMessageConstants.cannotUploadImage
			);

			this.updateInformationForm.patchValue({ profileImage: null });
			this.imagePreview = null;
			return;
		}

		if (!allowedTypes.includes(file.type)) {
			this.alert.error(
				ErrorMessageConstants.imageIsNotInAllowedType + '!',
				ErrorMessageConstants.cannotUploadImage
			);

			this.updateInformationForm.patchValue({ profileImage: null });
			this.imagePreview = null;
			return;
		}

		this.updateInformationForm.patchValue({ profileImage: file });
		this.updateInformationForm.get('profileImage')?.updateValueAndValidity();

		// 👇 Preview trước
		const reader = new FileReader();
		reader.onload = () => {
			this.imagePreview = reader.result;
		};
		reader.readAsDataURL(file);

		// 👇 Upload lên Cloudinary
		this.cloudinary
			.uploadImage(file)
			.then(url => {
				console.log('Uploaded image URL:', url);
				this.updateInformationForm.patchValue({ profileImage: url }); // Gán URL luôn
			})
			.catch(err => {
				this.alert.error(
					ErrorMessageConstants.errorInUploadImagePleaseTryAgain,
					ErrorMessageConstants.cannotUploadImage
				);
			});
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
