import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
interface ProductItem {
	productId: number | null;
	quantity: number;
	importPrice: number;
}
@Component({
	standalone: true,
	imports: [CommonModule, FormsModule,
    ReactiveFormsModule,],
	selector: 'app-Import-inventory',
	templateUrl: './Import-inventory.component.html',
	styleUrls: ['./Import-inventory.component.scss'],
})
export class ImportInventoryComponent implements OnInit {
	 
 purchaseForm!: FormGroup;
  suppliers: any[] = [];
  products: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.purchaseForm = this.fb.group({
      supplierId: [null, Validators.required],
      createdAt: [new Date().toISOString().slice(0, 16), Validators.required],
      status: ['PENDING', Validators.required],
      items: this.fb.array([])
    });

    this.loadSuppliers();
    this.loadProducts();
    this.addItem();
  }

  get items(): FormArray {
    return this.purchaseForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]]
    }));
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  loadSuppliers() {
    this.http.get<any[]>('/v1/suppliers').subscribe(data => this.suppliers = data);
  }

  loadProducts() {
    this.http.get<any[]>('/v1/products').subscribe(data => this.products = data);
  }

  get totalPrice(): number {
    return this.items.controls.reduce((sum, ctrl) => {
      const quantity = ctrl.get('quantity')?.value || 0;
      const unitPrice = ctrl.get('unitPrice')?.value || 0;
      return sum + quantity * unitPrice;
    }, 0);
  }

  submit(): void {
    if (this.purchaseForm.invalid) return;

    const formData = this.purchaseForm.value;
    formData.totalPrice = this.totalPrice;

    this.http.post(`/v1/purchase-orders?supplierId=${formData.supplierId}`, formData)
      .subscribe(result => {
        console.log('Đơn nhập đã tạo:', result);
      });
  }
}
