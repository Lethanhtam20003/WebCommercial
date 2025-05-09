import { Component, OnInit } from '@angular/core';
import { LabelConstants } from '../../../core/constants/label.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ErrorMessageConstants } from '../../../core/constants/error-message.constants';

@Component({
	selector: 'user-profile',
	imports: [],
	templateUrl: './user-profile.component.html',
	styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
	uploadImageForm!: FormGroup;
	imagePreview: string | ArrayBuffer | null = null;
	protected readonly label = LabelConstants;

	constructor(private fb: FormBuilder) {}
	ngOnInit(): void {
		this.uploadImageForm = this.fb.group({
			profileImage: [null],
		});
	}

	onFileSelected(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;

		const maxSizeInMB = 5;
		const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
		const allowedTypes = ['images/png', 'images/jpeg'];

		if (file.size > maxSizeInBytes) {
			Swal.fire({
				icon: 'error',
				title: ErrorMessageConstants.cannotUploadImage,
				text: ErrorMessageConstants.imageIsOversized + '!',
			});

			this.uploadImageForm.patchValue({ profileImage: null });
			this.imagePreview = null;
			return;
		}

		if (!allowedTypes.includes(file.type)) {
			Swal.fire({
				icon: 'error',
				title: ErrorMessageConstants.cannotUploadImage,
				text: ErrorMessageConstants.imageIsNotInAllowedType + '!',
			});

			this.uploadImageForm.patchValue({ profileImage: null });
			this.imagePreview = null;
			return;
		}

		this.uploadImageForm.patchValue({ profileImage: file });
		this.uploadImageForm.get('profileImage')?.updateValueAndValidity();

		const reader = new FileReader();
		reader.onload = () => {
			this.imagePreview = reader.result;
		};
		reader.readAsDataURL(file);
	}
}
