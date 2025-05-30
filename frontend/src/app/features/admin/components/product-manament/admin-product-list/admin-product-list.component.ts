import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AdminProductService } from '../../../service/admin-product.service';
import { ProductResponse } from '../../../../../core/models/productResponse';
import { ProductStatusType } from '../../../models/product-status.enum';

@Component({
	standalone: true,
	imports: [FormsModule, CommonModule, RouterLink],
	selector: 'app-admin-product-list',
	templateUrl: './admin-product-list.component.html',
	styleUrls: ['./admin-product-list.component.scss'],
})
export class AdminProductListComponent implements OnInit {
	constructor(
		private adminProductService: AdminProductService,
		private router: Router,
	) {}
	ProductStatusType = ProductStatusType;
	
	products: ProductResponse[] = [];

	ngOnInit() {
		this.adminProductService.getAll().subscribe(data => {
			console.log('data', data);
			this.products = data;
		});
	}
}
