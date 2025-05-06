import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouteLink } from '../../../core/constants/route-link';
import { LabelConstants } from '../../../core/constants/label.constants';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterModule, FormsModule, ReactiveFormsModule],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss', './header.scss'],
})
export class HeaderComponent {
	constructor(
		private fb: FormBuilder,
		private http: HttpClient,
		private router: Router
	) {}

	logo: string = 'assets/images/shop/logo.png';
	searchForm!: FormGroup;
	ngOnInit(): void {
		this.searchForm = this.fb.group({
			searchInput: [''],
		});
	}

	/**
	 * @description: navigation while in home page, or else reload the page if stay in home page
	 */
	goHome() {
		if (this.router.url === this.route.homeRoute || this.router.url === '/') {
			location.reload();
		} else {
			this.router.navigate([this.route.homeRoute]);
		}
	}

	protected readonly route = RouteLink;
	protected readonly label = LabelConstants;
}
