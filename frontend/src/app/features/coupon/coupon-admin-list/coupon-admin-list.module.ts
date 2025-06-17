import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponAdminListComponent } from './coupon-admin-list.component';



@NgModule({
  declarations: [CouponAdminListComponent],
  imports: [
    CommonModule
  ],
  exports: [CouponAdminListComponent]
})
export class CouponAdminListModule { }
