import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductFilter } from '../../core/models/request/filter/productFilter';
import { ProductListComponent } from '../../features/product/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../features/admin/service/admin-category.service';
import { CategoryResponse } from '../../core/models/response/product-response/CategoryResponse';

@Component({
	standalone: true,
	imports: [CommonModule, ProductListComponent],
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
	productFilter!: ProductFilter;
	category!: CategoryResponse;
	constructor(private route: ActivatedRoute,
		private categoryService: CategoryService,
	) {}

	ngOnInit(): void {
		const categoryId = Number(this.route.snapshot.paramMap.get('id'));
		this.categoryService.getCategoryById(categoryId).subscribe(data => {
			this.category = data;
		});
		this.productFilter = {
			page: 0,
			size: 16,
			categoryId: [categoryId],
		};
	}
}
