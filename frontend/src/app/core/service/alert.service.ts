import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
	providedIn: 'root',
})
export class AlertService {
	private swal = Swal.mixin({
		confirmButtonText: 'OK',
		cancelButtonText: 'Hủy',
		buttonsStyling: true,
		customClass: {
			confirmButton: 'btn btn-primary mx-2',
			cancelButton: 'btn btn-secondary mx-2',
		},
	});

	/**
	 * Thông báo thành công
	 * @param message Nội dung thông báo
	 * @param title Tiêu đề (mặc định: "Thành công")
	 */
	success(message: string, title = 'Thành công'): void {
		this.swal.fire({
			icon: 'success',
			title,
			text: message,
		});
	}

	/**
	 * Thông báo lỗi
	 * @param message Nội dung lỗi
	 * @param title Tiêu đề (mặc định: "Lỗi")
	 */
	error(message: string, title = 'Lỗi'): void {
		this.swal.fire({
			icon: 'error',
			title,
			text: message,
		});
	}

	/**
	 * Cảnh báo
	 * @param message Nội dung cảnh báo
	 * @param title Tiêu đề (mặc định: "Cảnh báo")
	 */
	warning(message: string, title = 'Cảnh báo'): void {
		this.swal.fire({
			icon: 'warning',
			title,
			text: message,
		});
	}

	/**
	 * Nhắc xác nhận hành động
	 * @param message Nội dung yêu cầu xác nhận
	 * @param title Tiêu đề (mặc định: "Xác nhận")
	 * @returns Promise<boolean> true nếu người dùng chọn OK
	 */
	confirm(message: string, title = 'Xác nhận'): Promise<boolean> {
		return this.swal
			.fire({
				icon: 'question',
				title,
				text: message,
				showCancelButton: true,
			})
			.then(result => result.isConfirmed);
	}

	/**
	 * Hiển thị SweetAlert dạng loading với spinner và tự động đóng sau thời gian quy định.
	 *
	 * @param message Nội dung hiển thị trong alert
	 * @param title Tiêu đề của alert
	 * @param timer Thời gian tồn tại (ms), mặc định 3000
	 * @param timerProgressBar Hiển thị progress bar hay không, mặc định true
	 * @param allowOutsideClick Có cho phép click ra ngoài để đóng alert không, mặc định false
	 */
	loading(
		message: string,
		title: string,
		timer = 3000,
		timerProgressBar: boolean = true,
		allowOutsideClick: boolean = false
	): Promise<any | null> {
		return this.swal
			.fire({
				title,
				html: message,
				timer,
				timerProgressBar: timerProgressBar,
				allowOutsideClick: allowOutsideClick,
				didOpen: () => {
					this.swal.showLoading(this.swal.getConfirmButton());
				},
			})
			.then(result => (result.isConfirmed ? result.value : null));
	}

	/**
	 * Nhập dữ liệu đơn giản
	 * @param inputLabel Nhãn cho ô nhập
	 * @param title Tiêu đề (mặc định: "Nhập thông tin")
	 * @returns Promise<string | null>
	 */
	input(inputLabel: string, title = 'Nhập thông tin'): Promise<string | null> {
		return this.swal
			.fire({
				title,
				input: 'text',
				inputLabel,
				showCancelButton: true,
			})
			.then(result => (result.isConfirmed ? result.value : null));
	}

	/**
	 * Hiển thị một hộp thoại thông tin với các tùy chọn xác nhận, từ chối hoặc hủy.
	 *
	 * @param title - Tiêu đề của hộp thoại.
	 * @param confirmButtonText - Nội dung nút xác nhận.
	 * @param showDenyButton - Có hiển thị nút từ chối hay không (mặc định là false).
	 * @param showCancelButton - Có hiển thị nút hủy hay không (mặc định là false).
	 * @returns Một Promise trả về `result.value` nếu người dùng bấm xác nhận, ngược lại trả về null.
	 */
	info(
		title: string,
		confirmButtonText: string,
		showDenyButton: boolean = false,
		showCancelButton: boolean = false
	): Promise<any | null> {
		return this.swal
			.fire({
				title,
				showDenyButton,
				showCancelButton,
				confirmButtonText,
				denyButtonText: `Don't save`,
			})
			.then(result => (result.isConfirmed ? result.value : null));
	}

	async showForm(
		title: string,
		fields: ModalInputField[]
	): Promise<Record<string, string | File> | null> {
		const formHtml = fields
			.map(f => {
				if (f.type === 'textarea') {
					return `
            <div class="mb-3 text-start">
              <label class="form-label fw-semibold">${f.label}</label>
              <textarea id="${f.name}" class="form-control" placeholder="${f.placeholder || ''}" rows="3">${f.value || ''}</textarea>
            </div>
        `;
				} else if (f.type === 'file') {
					return `
            <div class="mb-3 text-start">
              <label class="form-label fw-semibold">${f.label}</label>
              <input type="file" id="${f.name}" class="form-control" ${f.required ? 'required' : ''} />
              <img id="preview-${f.name}" class="img-thumbnail mt-2 d-none" style="max-height: 150px;" />
            </div>
          `;
				} else if (f.type === 'datetime-local') {
					return `
            <div class="mb-3 text-start">
              <label class="form-label fw-semibold">${f.label}</label>
              <input
                type="datetime-local"
                id="${f.name}"
                class="form-control"
                value="${f.value || ''}"
                ${f.required ? 'required' : ''}
              />
            </div>
          `;
				} else if (f.type === 'select') {
					const optionsHtml = (f.options || [])
						.map(o => `<option value="${o.value}">${o.label}</option>`)
						.join('');

					return `
            <div class="mb-3 text-start">
              <label class="form-label fw-semibold">${f.label}</label>
              <select id="${f.name}" class="form-select" ${f.required ? 'required' : ''}>
                <option value="" disabled selected hidden>-- Chọn --</option>
                ${optionsHtml}
              </select>
            </div>
          `;
				} else {
					return `
            <div class="mb-3 text-start">
              <label class="form-label fw-semibold">${f.label}</label>
              <input
                type="${f.type || 'text'}"
                id="${f.name}"
                class="form-control"
                placeholder="${f.placeholder || ''}"
                value="${f.value || ''}"
                ${f.required ? 'required' : ''}
              />
            </div>
        `;
				}
			})
			.join('');

		setTimeout(() => {
			fields.forEach(f => {
				if (f.type === 'file') {
					const input = document.getElementById(f.name) as HTMLInputElement;
					const preview = document.getElementById(
						`preview-${f.name}`
					) as HTMLImageElement;

					if (input && preview) {
						input.addEventListener('change', () => {
							const file = input.files?.[0];
							if (file) {
								const reader = new FileReader();
								reader.onload = () => {
									preview.src = reader.result as string;
									preview.style.display = 'block';
								};
								reader.readAsDataURL(file);
							}
						});
					}
				}
			});
		}, 0);

		const result: Record<string, string | File> = {};

		const { isConfirmed } = await Swal.fire({
			title,
			html: formHtml,
			focusConfirm: false,
			showCancelButton: true,
			confirmButtonText: 'Lưu',
			cancelButtonText: 'Hủy',
			preConfirm: () => {
				for (const f of fields) {
					if (f.type === 'file') {
						const input = document.getElementById(f.name) as HTMLInputElement;
						const file = input?.files?.[0];

						if (f.required && !file) {
							Swal.showValidationMessage(`Trường "${f.label}" là bắt buộc`);
							return null;
						}

						if (file) {
							result[f.name] = file;
						}
					} else {
						const val = (
							document.getElementById(f.name) as
								| HTMLInputElement
								| HTMLTextAreaElement
						)?.value.trim();

						if (f.required && !val) {
							Swal.showValidationMessage(`Trường "${f.label}" là bắt buộc`);
							return null;
						}

						result[f.name] = val || '';
					}
				}

				return result;
			},
		});

		return isConfirmed ? result : null;
	}

	constructor() {}
}

export interface ModalInputField {
	name: string;
	label: string;
	type?:
		| 'text'
		| 'number'
		| 'email'
		| 'password'
		| 'file'
		| 'textarea'
		| 'datetime-local'
		| 'select';
	required?: boolean;
	placeholder?: string;
	value?: string;
	options?: { label: string; value: string }[]; // chỉ dùng khi type là 'select'
}
