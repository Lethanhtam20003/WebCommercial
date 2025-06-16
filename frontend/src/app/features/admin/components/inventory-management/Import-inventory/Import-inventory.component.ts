import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import {
	FormArray,
	FormBuilder,
	FormGroup,
	FormsModule,
	NgModel,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SupplierResponse } from '../../../../../core/models/response/supplier-response/SupplierResponse';
import { ProductService } from '../../../../../core/service/product.service';
import { AdminSupplierService } from '../../../../../core/service/supplier/admin-supplier.service';
import { ProductResponse } from '../../../../../core/models/response/product-response/productResponse';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductFilter } from '../../../../../core/models/request/filter/productFilter';
import { AdminPurchaseOrderService } from '../../../../../core/service/purchaseOrder/Admin_purchase_order.service';

interface ProductItem {
	productId: number | null;
	quantity: number;
	importPrice: number;
}

@Component({
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule,CurrencyMaskModule],
	selector: 'app-Import-inventory',
	templateUrl: './Import-inventory.component.html',
	styleUrls: ['./Import-inventory.component.scss'],
})
export class ImportInventoryComponent implements OnInit {
	purchaseForm!: FormGroup;
	suppliers: SupplierResponse[] = [];
	products: ProductResponse[] = [];
	productItems: ProductItem[] = [];

	constructor(
		private fb: FormBuilder,
		private http: HttpClient,
		private productService: ProductService,
		private supplierService: AdminSupplierService,
		private purchaseService: AdminPurchaseOrderService
	) {}

	ngOnInit(): void {
		this.purchaseForm = this.fb.group({
			supplierId: [null, Validators.required],
			createdAt: [new Date().toISOString().slice(0, 16), Validators.required],
			status: ['PENDING', Validators.required],
			items: this.fb.array([]),
		});
		this.supplierService.fetchSuppliers();
		this.supplierService.listSuppliers$.subscribe(
			data => (this.suppliers = data)
		); 

		const productFilter: ProductFilter = {
			page: 0,
			size: 9999,
		};

		this.productService.fetchProducts(productFilter);
		this.productService.pageProducts$.subscribe(
			data => (this.products = data.content)
		);

		this.addItem();
	}

	get items(): FormArray {
		return this.purchaseForm.get('items') as FormArray;
	}

	addItem(): void {
		const group = this.fb.group({
		productId: [null, Validators.required],
		quantity: [1, [Validators.required, Validators.min(1)]],
		unitPrice: [0, [Validators.required, Validators.min(0)]],
	});

	// Khi chọn productId thì gán giá tự động
	group.get('productId')!.valueChanges.subscribe(productId => {
		const selectedProduct = this.products.find(p => p.id === productId);
		if (selectedProduct) {
			group.get('unitPrice')!.setValue(Number(selectedProduct.price) ?? 0, { emitEvent: false });
		}
	});

	this.items.push(group);
	}

	removeItem(index: number): void {
		this.items.removeAt(index);
	}

	get totalPrice(): number {
		return this.items.controls.reduce((sum, ctrl) => {
			const quantity = ctrl.get('quantity')?.value || 0;
			const unitPrice = ctrl.get('unitPrice')?.value || 0;
			return sum + quantity * unitPrice;
		}, 0);
	}

	submit(): void {
		if (this.purchaseForm.invalid) {
			return;
		}
		const formData = this.purchaseForm.value;
		formData.totalPrice = this.totalPrice;
		console.log(formData);
		
		this.purchaseService.createPurchaseOrder(formData).subscribe(
			{
				next: res => {},
				error: err => {
					console.error('Lỗi khi tạo đơn hàng:', err);
				},
			}
		)

	}
	
}
