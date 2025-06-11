import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomNgSelectComponent } from '../../../../../shared/components/custom-ng-select/custom-ng-select.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductResponse } from '../../../../../core/models/response/product-response/productResponse';
import { CategoryResponse } from '../../../../../core/models/response/product-response/CategoryResponse';
import { PromotionResponse } from '../../../../../core/models/response/product-response/PromotionResponse';
import { ProductService } from '../../../../../core/service/product.service';
import { AdminProductService } from '../../../service/admin-product.service';

@Component({
  standalone: true,
  imports: [ CustomNgSelectComponent,CommonModule,FormsModule],
  selector: 'app-admin-fix-product',
  templateUrl: './admin-fix-product.component.html',
  styleUrls: ['./admin-fix-product.component.scss']
})
export class AdminFixProductComponent implements OnInit {

 
  product!: ProductResponse;

	categoryList: CategoryResponse[] = [];
	statusOptions = [
		{ value: 'ACTIVE', label: 'Hoạt động' },
		{ value: 'INACTIVE', label: 'Ngừng hoạt động' },
		{ value: 'DELETED', label: 'Đã xóa' },
	];
	promotionList: PromotionResponse[] = [];

	constructor(private route: ActivatedRoute,
    private productService: AdminProductService
  ) {}

	ngOnInit(): void {
		const productId = this.route.snapshot.params['id'];
		this.loadProduct(productId);
		this.loadCategoryList();
		this.loadPromotionList();
	}

	loadProduct(id: number) {
		this.productService.getProductById(id).subscribe((ApiResponse) => {
			this.product = ApiResponse.result;
      console.log(this.product)
		});
	}

	loadCategoryList() {
		// TODO: Gọi API lấy danh sách danh mục
	}

	loadPromotionList() {
		// TODO: Gọi API lấy danh sách khuyến mãi
	}

	onImageSelected(event: any) {
		const files: FileList = event.target.files;
		// TODO: Upload ảnh và cập nhật vào product.images
	}

	updateProduct() {
		// TODO: Gửi dữ liệu cập nhật sản phẩm lên server
	}

}
