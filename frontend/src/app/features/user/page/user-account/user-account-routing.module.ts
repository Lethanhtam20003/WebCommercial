import { UserProfile } from '../../../../core/models/response/user/user-profile-response.model';
import { Routes } from '@angular/router';
import { AuthGuard } from '../../../../core/guards/auth.guard';
import { UserAccountComponent } from '../../../../shared/components/user-account/user-account.component';
import { LabelConstants } from '../../../../shared/constants/label.constants';
import { RouteLink } from '../../../../shared/constants/route-link';
import { UserProfileComponent } from '../../../../shared/components/user-profile/user-profile.component';
import { ChangePasswordComponent } from '../../../../shared/components/change-password/change-password.component';
import { CouponListComponent } from '../../../../shared/components/coupon-list/coupon-list.component';
import { OrderManangementComponent } from '../../../../shared/components/order-management/order-management.component';

export const userAccountRoutes: Routes = [
	{
		path: '',
		component: UserAccountComponent,
		children: [
			{
				path: '',
				redirectTo: RouteLink.profileRoute,
				pathMatch: 'full',
			},
			{
				path: RouteLink.profileRoute,
				component: UserProfileComponent,
				title: LabelConstants.userProfile,
				canActivate: [AuthGuard],
			},
			{
				path: RouteLink.changePasswordRoute,
				component: ChangePasswordComponent,
				title: LabelConstants.changePassword,
				canActivate: [AuthGuard],
			},
			// {
			// 	path: RouteLink.orderRoute,
			// 	redirectTo: `${RouteLink.orderRoute}/${RouteLink.allRoute}`,
			// 	pathMatch: 'full',
			// },
			{
				path: RouteLink.orderRoute,
				component: OrderManangementComponent,
				title: LabelConstants.order,
				canActivate: [AuthGuard],
			},
			{
				path: RouteLink.couponRoute,
				component: CouponListComponent,
				title: LabelConstants.couponList,
				canActivate: [AuthGuard],
			},
		],
	},
];
