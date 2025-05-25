import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
interface ProductItem {
	productId: number | null;
	quantity: number;
	importPrice: number;
}
@Component({
	standalone: true,
	imports: [CommonModule, FormsModule],
	selector: 'app-Import-inventory',
	templateUrl: './Import-inventory.component.html',
	styleUrls: ['./Import-inventory.component.scss'],
})
export class ImportInventoryComponent implements OnInit {
	today: Date = new Date();
	message: string = '';

	suppliers = [
		{ id: 1, name: 'Nhà cung cấp A' },
		{ id: 2, name: 'Nhà cung cấp B' },
		{ id: 3, name: 'Nhà cung cấp C' },
	];

	products = [
		{ id: 101, name: 'Sản phẩm X' },
		{ id: 102, name: 'Sản phẩm Y' },
		{ id: 103, name: 'Sản phẩm Z' },
	];

	formData = {
		supplier: null as number | null,
		items: [{ productId: null, quantity: 1, importPrice: 0 } as ProductItem],
		note: '',
	};

	constructor() {}

	ngOnInit(): void {}

	addItem(): void {
		this.formData.items.push({ productId: null, quantity: 1, importPrice: 0 });
	}

	removeItem(index: number): void {
		this.formData.items.splice(index, 1);
	}

	onSubmit(): void {
		if (!this.formData.supplier || this.formData.items.length === 0) {
			this.message = 'Vui lòng chọn nhà cung cấp và ít nhất 1 sản phẩm.';
			return;
		}

		// Validate từng item
		const isValid = this.formData.items.every(
			item => item.productId && item.quantity > 0 && item.importPrice >= 0
		);

		if (!isValid) {
			this.message = 'Vui lòng điền đầy đủ thông tin cho từng sản phẩm.';
			return;
		}

		// Gửi dữ liệu đi (API giả lập)
		console.log('Dữ liệu nhập kho:', this.formData);
		this.message = '✅ Nhập kho thành công!';

		// Reset form nếu muốn
		// this.resetForm();
	}

	onImportExcel(): void {
		// Mở hộp thoại tải Excel hoặc gọi API xử lý file Excel
		alert('🚧 Tính năng nhập từ Excel đang được phát triển.');
	}

	resetForm(): void {
		this.formData = {
			supplier: null,
			items: [{ productId: null, quantity: 1, importPrice: 0 }],
			note: '',
		};
		this.message = '';
	}
}
