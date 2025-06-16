import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LabelConstants } from '../../../../shared/constants/label.constants';
import { AuthGuard } from '../../../../core/guards/auth.guard';
import { OrderComponent } from '../../../../shared/components/order/order.component';

const routes: Routes = [
	{
		path: '',
		component: OrderComponent,
		title: LabelConstants.order,
		canActivate: [AuthGuard],
	},
	{
		path: '',
		redirectTo: 'order',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class OrderRoutingModule {}
