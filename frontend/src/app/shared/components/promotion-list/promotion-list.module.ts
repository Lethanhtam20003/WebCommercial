import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionListComponent } from './promotion-list.component';
import { PromotionsModule } from '../promotions/promotions.module';

@NgModule({
	declarations: [PromotionListComponent],
	imports: [CommonModule, PromotionsModule],
  exports: [PromotionListComponent],
})
export class PromotionListModule {}
