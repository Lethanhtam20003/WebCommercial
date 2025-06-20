import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../core/service/product.service';
import { ProductFilter } from '../../../core/models/request/filter/productFilter';
import { PageResponse } from '../../../core/models/response/product-response/product-response/page-response.interface';
import { ProductResponse } from '../../../core/models/response/product-response/productResponse';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
	standalone: true,
	imports: [ProductCardComponent,CommonModule],
	selector: 'app-list-product-referent',
	templateUrl: './list-product-referent.component.html',
	styleUrls: ['./list-product-referent.component.css'],
})
export class ListProductReferentComponent implements OnInit {
  @Input() categoryId!: number;
	productFilter!: ProductFilter;
	pageProducts!: PageResponse<ProductResponse>;

	constructor(private productService: ProductService) {}

	ngOnInit() {
		this.productFilter = {
			page: 0,
			size: 4,
		};
		this.productFilter.categoryId = [this.categoryId];

		this.productService.fetchProducts(this.productFilter);
		this.productService.pageProducts$.subscribe(data => {
			this.pageProducts = data;
			console.log(this.pageProducts);
		});
	}
}
