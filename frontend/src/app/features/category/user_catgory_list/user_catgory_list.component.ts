import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryResponse } from '../../../core/models/response/product-response/CategoryResponse';
import { CategoryService } from '../../admin/service/admin-category.service';

@Component({
	standalone: true,
	imports: [NgFor, RouterModule, NgFor,CommonModule],
	selector: 'app-user_catgory_list',
	templateUrl: './user_catgory_list.component.html',
	styleUrls: ['./user_catgory_list.component.scss'],
})
export class User_catgory_listComponent implements OnInit {
	categories!: CategoryResponse[];

	constructor(
    private categoryService: CategoryService,
  ) {}

	ngOnInit() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }
	defaultImage =
		'https://bizweb.dktcdn.net/100/485/982/themes/918620/assets/img_3banner_2.jpg?1749455998723';


}
  