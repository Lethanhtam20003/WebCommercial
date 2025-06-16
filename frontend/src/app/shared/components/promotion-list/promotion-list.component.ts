import { Component } from '@angular/core';

@Component({
  selector: 'app-promotion-list',
  standalone: false,
  templateUrl: './promotion-list.component.html',
  styleUrl: './promotion-list.component.scss'
})
export class PromotionListComponent {
  promotionCoupons = [
    {
      id: 'CPN01',
      title: 'Giảm 30k đơn từ 199k',
      description: 'Áp dụng cho toàn bộ sản phẩm',
      condition: 'Hết hạn trong vòng 10 phút',
      expireAt: Date.now() + 10 * 60 * 1000,
      saved: false,
    },
    {
      id: 'CPN02',
      title: 'Freeship đơn từ 99k',
      description: 'Dành riêng cho khách mới',
      condition: 'Hết hạn trong vòng 5 phút',
      expireAt: Date.now() + 5 * 60 * 1000,
      saved: false,
    },
  ];

}
