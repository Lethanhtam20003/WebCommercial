import { Component, OnInit } from '@angular/core';
import { LabelConstants } from '../../../core/constants/label.constants';
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
import {
	UserProfileFormFields,
} from './user-profile.interface';

@Component({
	selector: 'user-profile',
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './user-profile.component.html',
	styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
	updateInformationForm!: FormGroup;
	imagePreview: string | ArrayBuffer | null = null;
	protected readonly label = LabelConstants;

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.updateInformationForm = this.fb.group({
			username: new FormControl<string>({ value: 'username', disabled: true }),
			email: new FormControl<string>('name@example.com'),
			fullName: new FormControl<string>('full-name'),
			profileImage: new FormControl<File | null>(null),
      address: new FormControl<string>('San Francisco, CA'),
      phoneNum: new FormControl<string>('555-123-4567'),
      birthday: new FormControl<string>('06/10/1988'),
      gender: new FormControl<string>(this.label.male)
		}) as FormGroup<UserProfileFormFields>;
	}

	onFileSelected(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;

		console.log(file.name);

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
}
