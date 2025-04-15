import { RouteLink } from './../../constant/route-link';
import { LabelConstants } from './../../constant/label.constants';
import { Component, OnInit } from '@angular/core';
import { selectorName } from '../../constant/selectorName';
import { RouterModule } from '@angular/router';
import { Image } from 'primeng/image';
import { NgIf } from '@angular/common';

@Component({
	selector: selectorName.headerTopBar,
	imports: [RouterModule, Image, NgIf],
	template: `
		<div class="bg-white text-sm">
			<div class="container mx-auto px-4">
				<div
					class="flex flex-col lg:flex-row justify-between items-center py-2 text-sm"
				>
					<!-- Top Left -->
					<div class="mb-2 lg:mb-0">
						<ul class="flex flex-wrap gap-4 items-center text-gray-700">
							<li class="flex items-center gap-1">
								<i class="pi pi-headphones" style="color: #FF4500"></i>
								<span>{{ Label.hotLinePhoneNum }}</span>
							</li>
							<li class="flex items-center gap-1">
								<i class="pi pi-envelope" style="color: #FF4500"></i>
								<span>{{ Label.organizationEmail }}</span>
							</li>
						</ul>
					</div>

					<!-- Top Right -->
					<div>
						<ul class="flex flex-wrap gap-4 items-center text-gray-700">
							<li class="flex items-center gap-1">
								<i class="pi pi-map-marker" style="color: #FF4500"></i>
								<span>Store location</span>
							</li>
							<li class="flex items-center gap-1">
								<i class="pi pi-user" style="color: #FF4500"></i>
								<a routerLink="#" class="hover:text-[#FF4500]">{{
									Label.userProfile
								}}</a>
							</li>
							<li class="flex items-center gap-1">
								<i class="pi pi-power-off" style="color: #FF4500"></i>
								<a
									[routerLink]="['/', router.loginRoute]"
									class="hover:text-[#FF4500]"
								>
									<span *ngIf="!isLoggin; else isLoggedIn">{{
										Label.logIn
									}}</span>
									<ng-template #isLoggedIn>{{ Label.logOut }}</ng-template>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div>
					<p-image
						[routerLink]="['/', router.homeRoute]"
						[src]="logo"
						width="150"
						class="cursor-pointer"
					/>
				</div>
			</div>
		</div>
	`,
	styles: ``,
})
export class HeaderTopbarComponent implements OnInit {
	ngOnInit(): void {
		this.logo = 'assets/images/shop/logo2.png';
		this.Label = LabelConstants;
		this.router = RouteLink;
		const loginStatus = localStorage.getItem('isLoggin');
		this.isLoggin = loginStatus === 'true';
    console.log(this.Label.description);
	}
	isLoggin: boolean = false;
	logo!: string;

	Label: typeof LabelConstants = LabelConstants;
	router: typeof RouteLink = RouteLink;
}
