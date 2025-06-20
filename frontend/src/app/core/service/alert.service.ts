import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { AddressService } from './AddressService.service';
@Injectable({
	providedIn: 'root',
})
export class AlertService {
	constructor(private addressService: AddressService) {}

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
		timer = 1000,
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
	): Promise<Record<string, string | string[] | File> | null> {
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
				} else if (f.type === 'multiselect') {
					const optionsHtml = (f.options || [])
						.map(o => `<option value="${o.value}">${o.label}</option>`)
						.join('');

					return `
		<div class="mb-3 text-start">
			<label class="form-label fw-semibold">${f.label}</label>
			<select id="${f.name}" class="form-select" multiple ${f.required ? 'required' : ''}>
				${optionsHtml}
			</select>
			<small class="text-muted">Giữ Ctrl (hoặc Cmd) để chọn nhiều mục</small>
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

		const result: Record<string, string | string[] | File> = {};

		const { isConfirmed } = await this.swal.fire({
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
							this.swal.showValidationMessage(
								`Trường "${f.label}" là bắt buộc`
							);
							return null;
						}

						if (file) {
							result[f.name] = file;
						}
					} else {
						if (f.type === 'multiselect') {
							const select = document.getElementById(
								f.name
							) as HTMLSelectElement;
							const selectedOptions = Array.from(select.selectedOptions).map(
								opt => opt.value
							);

							if (f.required && selectedOptions.length === 0) {
								this.swal.showValidationMessage(
									`Trường "${f.label}" là bắt buộc`
								);
								return null;
							}

							result[f.name] = selectedOptions;
						} else {
							const val = (
								document.getElementById(f.name) as
									| HTMLInputElement
									| HTMLTextAreaElement
							)?.value.trim();

							if (f.required && !val) {
								this.swal.showValidationMessage(
									`Trường "${f.label}" là bắt buộc`
								);
								return null;
							}

							result[f.name] = val || '';
						}
					}
				}

				return result;
			},
		});

		return isConfirmed ? result : null;
	}
	async changeAddress() {
		const provinces = await firstValueFrom(this.addressService.getProvinces());
		const provinceOptions = provinces
			.map(p => `<option value="${p.code}">${p.name}</option>`)
			.join('');

		return this.swal.fire({
			title: 'Thay đổi địa chỉ',
			width: '80rem',
			html: `
			<style>
				.flex-row {
					display: flex;
					gap: 8px;
					margin-bottom: 8px;
				}
				.flex-row > div {
					flex: 1;
					display: flex;
					flex-direction: column;
				}
				label {
					font-size: 14px;
					margin-bottom: 4px;
					text-align: left;
				}
			</style>

			<div class="flex-row">
				<div>
					<label for="fullName">Họ tên người nhận</label>
					<input id="fullName" class="swal2-input" placeholder="Họ tên người nhận" />
				</div>
				<div>
					<label for="phoneNumber">Số điện thoại</label>
					<input id="phoneNumber" class="swal2-input" placeholder="Số điện thoại" />
				</div>
			</div>

			<div class="flex-row">
				<div>
					<label for="province">Tỉnh/Thành phố</label>
					<select id="province" class="swal2-select">
						<option disabled selected>Chọn tỉnh/thành phố</option>
						${provinceOptions}
					</select>
				</div>
				<div>
					<label for="district">Quận/Huyện</label>
					<select id="district" class="swal2-select">
						<option disabled selected>Chọn quận/huyện</option>
					</select>
				</div>
				<div>
					<label for="ward">Phường/Xã</label>
					<select id="ward" class="swal2-select">
						<option disabled selected>Chọn phường/xã</option>
					</select>
				</div>
			</div>

			<div style="margin-top: 10px;">
				<label for="detail">Số nhà, tên đường</label>
				<input id="detail" class="swal2-input" placeholder="Số nhà, tên đường" />
			</div>
		`,
			showCancelButton: true,
			confirmButtonText: 'Xác nhận',
			didOpen: () => {
				const provinceSelect = document.getElementById(
					'province'
				) as HTMLSelectElement;
				const districtSelect = document.getElementById(
					'district'
				) as HTMLSelectElement;
				const wardSelect = document.getElementById('ward') as HTMLSelectElement;

				provinceSelect.addEventListener('change', async () => {
					const provinceCode = +provinceSelect.value;
					const provinceData = await firstValueFrom(
						this.addressService.getDistricts(provinceCode)
					);
					const districtOptions = provinceData.districts
						.map((d: any) => `<option value="${d.code}">${d.name}</option>`)
						.join('');
					districtSelect.innerHTML =
						`<option disabled selected>Chọn quận/huyện</option>` +
						districtOptions;
					wardSelect.innerHTML = `<option disabled selected>Chọn phường/xã</option>`;
				});

				districtSelect.addEventListener('change', async () => {
					const districtCode = +districtSelect.value;
					const districtData = await firstValueFrom(
						this.addressService.getWards(districtCode)
					);
					const wardOptions = districtData.wards
						.map((w: any) => `<option value="${w.code}">${w.name}</option>`)
						.join('');
					wardSelect.innerHTML =
						`<option disabled selected>Chọn phường/xã</option>` + wardOptions;
				});
			},
			preConfirm: () => {
				const fullName = (
					document.getElementById('fullName') as HTMLInputElement
				)?.value?.trim();
				const phoneNumber = (
					document.getElementById('phoneNumber') as HTMLInputElement
				)?.value?.trim();
				const detail = (
					document.getElementById('detail') as HTMLInputElement
				)?.value?.trim();
				const province = (
					document.getElementById('province') as HTMLSelectElement
				)?.selectedOptions[0]?.text;
				const district = (
					document.getElementById('district') as HTMLSelectElement
				)?.selectedOptions[0]?.text;
				const ward = (document.getElementById('ward') as HTMLSelectElement)
					?.selectedOptions[0]?.text;

				if (
					!fullName ||
					!phoneNumber ||
					!detail ||
					!province ||
					!district ||
					!ward
				) {
					this.swal.showValidationMessage(
						'Vui lòng nhập đầy đủ thông tin người nhận và địa chỉ'
					);
					return;
				}

				return {
					fullName,
					phoneNumber,
					detail,
					province,
					district,
					ward,
					fullAddress: `${detail}, ${ward}, ${district}, ${province}`,
				};
			},
		});
	}

	notification(message: string) {
		this.swal.fire({
			text: message,
			icon: 'success', // hoặc 'error', 'warning', 'info'
			showConfirmButton: false,
			timer: 2000, // hiển thị trong 2 giây
			timerProgressBar: true,
			toast: true,
			position: 'top-end', // hiển thị ở góc trên bên phải
		});
	}
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
		| 'select'
		| 'multiselect';
	required?: boolean;
	placeholder?: string;
	value?: string;
	options?: { label: string; value: string }[]; // chỉ dùng khi type là 'select'
}
