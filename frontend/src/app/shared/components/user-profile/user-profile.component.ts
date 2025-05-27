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
import { AlertService } from '../../../core/service/alert.service';
import { CloudinaryUploadService } from '../../../features/admin/service/cloudinary-upload.service';
import { UserStateService } from '../../../core/service/user-state.service';
import { Subject, takeUntil } from 'rxjs';
import { UserProfile } from '../../../core/models/user-profile.model';
import { UtitlyService } from '../../../core/service/utility.service';
import { UserUpdateRequest } from '../../../features/admin/models/user-update';
import { ResponseMessage } from '../../constants/response-message.constants';
import { UserService } from '../../../core/service/user.service';

@Component({
	selector: 'user-profile',
	imports: [CommonModule, ReactiveFormsModule],
	providers: [CloudinaryUploadService],
	templateUrl: './user-profile.component.html',
	styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
	updateInformationForm!: FormGroup;
	protected readonly label = LabelConstants;
	protected readonly errorMessage = ErrorMessageConstants;
	protected readonly responseMessage = ResponseMessage;
	private destroy$ = new Subject<void>();
	currentUser: UserProfile | null = null;

	constructor(
		private fb: FormBuilder,
		private alert: AlertService,
		private cloudinary: CloudinaryUploadService,
		private userState: UserStateService,
		protected utility: UtitlyService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.userState.loadUserFromStorageOrAPI();

		this.userState.user$.pipe(takeUntil(this.destroy$)).subscribe({
			next: user => {
        console.log('💥 Raw user:', user);

				if (!user) {
					this.userState.fetchUserInfo(); // gọi API để lấy user nếu chưa có
					return;
				}

				if (user) {
					this.currentUser = user;

					this.updateInformationForm = this.fb.group({
						email: new FormControl<string>('', [
							Validators.required,
							Validators.email,
						]),
						firstName: new FormControl<string>('', Validators.required),
						lastName: new FormControl<string>(''),
						profileImage: new FormControl<string | null>(
							'http://bootdey.com/img/Content/avatar/avatar1.png'
						),
						address: new FormControl<string>(''),
						phoneNum: new FormControl<string>('', Validators.required),
						birthday: new FormControl<string>(''),
						gender: new FormControl<string>(
							this.label.male,
							Validators.required
						),
					}) as FormGroup<UserProfileFormFields>;

					this.updateInformationForm.patchValue({
						email: user.email ?? '',
						firstName: user.firstName ?? '',
						lastName: user.lastName ?? '',
						profileImage:
							user.avatar ??
							'http://bootdey.com/img/Content/avatar/avatar1.png',
						address: user.address ?? '',
						phoneNum: user.phone ?? '',
						birthday: user.birthday ?? '',
						gender: user.gender ?? this.label.male,
					});
				}
			},
			error: () => {
				this.alert.error(ErrorMessageConstants.cannotLoadUserInfo);
			},
		});
	}

	onSubmit(): void {
		if (this.updateInformationForm.invalid) {
			this.updateInformationForm.markAllAsTouched();

			if (this.updateInformationForm.get('gender')?.hasError('required')) {
				this.alert.error(
					ErrorMessageConstants.genderIsNotEmpty + '!',
					ErrorMessageConstants.meetAnError
				);
			}
			return;
		}

		if (!this.currentUser) {
			this.alert.error(ErrorMessageConstants.currentUserIsunidentified);
			return;
		}

		this.alert.loading(
			this.label.pleaseWaitAMinute,
			this.label.onWorkingProcess
		);

		const formValue = this.updateInformationForm.value;

    console.log(formValue);

		const updatePayload: Partial<UserUpdateRequest> = {};

		// So sánh từng field – chỉ gán nếu khác
		if (formValue.firstName.trim() !== this.currentUser.firstName)
			updatePayload.firstName = formValue.firstName.trim();

		if (formValue.lastName.trim() !== this.currentUser.lastName)
			updatePayload.lastName = formValue.lastName.trim();

		if (formValue.email.trim() !== this.currentUser.email)
			updatePayload.email = formValue.email.trim();

		if (formValue.phoneNum.trim() !== this.currentUser.phone)
			updatePayload.phone = formValue.phoneNum.trim();

		if ((formValue.address ?? '').trim() !== (this.currentUser.address ?? ''))
			updatePayload.address = formValue.address?.trim() ?? '';

		if (formValue.gender !== this.currentUser.gender)
			updatePayload.gender = formValue.gender;

		if (formValue.birthday && formValue.birthday !== this.currentUser.birthday)
			updatePayload.birthday = formValue.birthday;

		if (
			formValue.profileImage &&
			formValue.profileImage !== this.currentUser.avatar
		)
			updatePayload.avatar = formValue.profileImage;

		// Optional: nếu không có field nào thay đổi
		if (Object.keys(updatePayload).length === 0) {
			this.alert.success(ResponseMessage.updateUserSuccess);
			return;
		}

		this.userService
			.updateUser(this.currentUser.id, updatePayload)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: updatedUser => {
					// ✅ Cập nhật frontend state để phản ánh ngay
					this.userState.updateUserInfo(updatedUser);
					this.alert.success(this.responseMessage.updateUserSuccess);
				},
				error: () => {
					this.alert.error(this.errorMessage.errorInUpdateUserInfo);
				},
			});
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
			return;
		}

		if (!allowedTypes.includes(file.type)) {
			this.alert.error(
				ErrorMessageConstants.imageIsNotInAllowedType + '!',
				ErrorMessageConstants.cannotUploadImage
			);

			this.updateInformationForm.patchValue({ profileImage: null });
			return;
		}

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

	get isFirstNameRequiredValid() {
		const ctrl = this.updateInformationForm?.get('firstName');
		return ctrl?.hasError('required') && ctrl?.touched;
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

interface UserProfileFormFields {
	email: FormControl<string>;
	firstName: FormControl<string>;
	lastName: FormControl<string>;
	address: FormControl<string>;
	phoneNum: FormControl<string>;
	profileImage: FormControl<string | null>;
	birthday: FormControl<string>;
	gender: FormControl<string>;
}

interface UserUpdateFormFields {
	password: FormControl<string | null>;
	firstName: FormControl<string | null>;
	lastName: FormControl<string | null>;
	birthday: FormControl<string | null>;
	avatar: FormControl<string | null>;
	gender: FormControl<string | null>;
	email: FormControl<string | null>;
	phone: FormControl<string | null>;
	address: FormControl<string | null>;
	status: FormControl<string | null>;
}
