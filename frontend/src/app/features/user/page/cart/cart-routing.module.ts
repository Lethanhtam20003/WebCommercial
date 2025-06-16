import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../../../../shared/components/cart/cart.component';
import { NgModule } from '@angular/core';
import { LabelConstants } from '../../../../shared/constants/label.constants';
import { AuthGuard } from '../../../../core/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: CartComponent,
		title: LabelConstants.cart,
		canActivate: [AuthGuard],
	},
	{
		path: '',
		redirectTo: 'cart',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CartRoutingModule {}
