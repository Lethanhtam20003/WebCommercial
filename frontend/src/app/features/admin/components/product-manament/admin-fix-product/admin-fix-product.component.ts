import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomNgSelectComponent } from '../../../../../shared/components/custom-ng-select/custom-ng-select.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ProductResponse } from '../../../../../core/models/response/product-response/productResponse';
import { CategoryResponse } from '../../../../../core/models/response/product-response/CategoryResponse';
import { PromotionResponse } from '../../../../../core/models/response/product-response/PromotionResponse';
import { AdminProductService } from '../../../service/admin-product.service';
import { PromotionService } from '../../../../../core/service/promotion.service';
import { CategoryService } from '../../../service/admin-category.service';

@Component({
	standalone: true,
	imports: [CustomNgSelectComponent, CommonModule, FormsModule],
	selector: 'app-admin-fix-product',
	templateUrl: './admin-fix-product.component.html',
	styleUrls: ['./admin-fix-product.component.scss'],
})
export class AdminFixProductComponent implements OnInit {
	product!: ProductResponse;

	categoryList: CategoryResponse[] = [];
	categorySelect: number | null = null;
	promotionSelect: number | null = null;
	statusOptions = [
		{ value: 'ACTIVE', label: 'Hoạt động' },
		{ value: 'INACTIVE', label: 'Ngừng hoạt động' },
		{ value: 'DELETED', label: 'Đã xóa' },
	];
	promotionList: PromotionResponse[] = [];

	constructor(
		private route: ActivatedRoute,
		private productService: AdminProductService,
		private promotionService: PromotionService,
		private categoryService: CategoryService
	) {}

	ngOnInit(): void {
		const productId = this.route.snapshot.params['id'];
		this.loadProduct(productId);
		this.loadCategoryList();
		this.loadPromotionList();
	}

	loadProduct(id: number) {
		this.productService.getProductById(id).subscribe(ApiResponse => {
			this.product = ApiResponse.result;
			this.categorySelect = this.product.categories[0].id;
			this.promotionSelect = this.product.promotions[0].promotionId;

		});
	}

	loadCategoryList() {
		// TODO: Gọi API lấy danh sách danh mục
		this.categoryService.getAll().subscribe(ApiResponse => {
			this.categoryList = ApiResponse;
		});
	}

	loadPromotionList() {
		// TODO: Gọi API lấy danh sách khuyến mãi
		this.promotionService.getActivePromotions().subscribe(ApiResponse => {
			this.promotionList = ApiResponse.result;
			console.log(this.promotionList);
		});
	}

	onImageSelected(event: any) {
		const files: FileList = event.target.files;
		// TODO: Upload ảnh và cập nhật vào product.images
	}

	updateProduct() {
		const productUpdateRequest = {
			name: this.product.name,
			description: this.product.description,
			price: this.product.price,
			status: this.product.status,
			categoryId: this.categorySelect,
			promotionId: this.promotionSelect,
			images: this.product.images, // nếu là mảng string chứa URL ảnh
		};
		console.log(productUpdateRequest);

		this.productService
			.updateProduct(this.product.id, productUpdateRequest)
			.subscribe({
				next: res => {
					console.log('Cập nhật thành công', res);
					// Có thể hiển thị thông báo hoặc chuyển trang
				},
				error: err => {
					console.error('Lỗi khi cập nhật sản phẩm', err);
				},
			});
	}
}
