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

	async changeAddress() {
		const provinces = await firstValueFrom(this.addressService.getProvinces());
		const provinceOptions = provinces
			.map(p => `<option value="${p.code}">${p.name}</option>`)
			.join('');

		return this.swal
			.fire({
				title: 'Thay đổi địa chỉ',
				html: `
				<input id="detail" class="swal2-input" placeholder="Số nhà, tên đường" />
				<select id="province" class="swal2-select">
					<option disabled selected>Chọn tỉnh/thành phố</option>
					${provinceOptions}
				</select>
				<select id="district" class="swal2-select">
					<option disabled selected>Chọn quận/huyện</option>
				</select>
				<select id="ward" class="swal2-select">
					<option disabled selected>Chọn phường/xã</option>
				</select>
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
					const wardSelect = document.getElementById(
						'ward'
					) as HTMLSelectElement;

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

					if (!detail || !province || !district || !ward) {
						this.swal.showValidationMessage(
							'Vui lòng nhập đầy đủ thông tin địa chỉ'
						);
						return;
					}

					return {
						detail,
						province,
						district,
						ward,
						fullAddress: `${detail}, ${ward}, ${district}, ${province}`,
					};
				},
			})
	}
}
