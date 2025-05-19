import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
@Component({
  standalone: true,
  imports: [FormsModule  , ReactiveFormsModule],
  selector: 'app-admin-product-create',
  templateUrl: './admin-product-create.component.html',
  styleUrls: ['./admin-product-create.component.css']
})
export class AdminProductCreateComponent implements OnInit {
 productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      alias: [''],
      code: [''],
      size: [''],
      material: [''],
      price: [0, Validators.min(0)],
      discountPrice: [0, Validators.min(0)],
      unit: ['VND'],
    });
  }
  ngOnInit(): void {
    // Initialize any data or perform setup tasks here
  }
  onSubmit() {
    if (this.productForm.valid) {
      console.log('🟢 Form submitted:', this.productForm.value);
      // Gửi dữ liệu đến backend tại đây
    }
  }

  goBack() {
    // Quay lại trang danh sách
    window.history.back();
  }
}
