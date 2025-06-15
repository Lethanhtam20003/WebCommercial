import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../../features/product/product-list/product-list.component';
import { OutstandingProductCatalogComponent } from '../../features/category/OutstandingProductCatalog/OutstandingProductCatalog.component';
import { User_catgory_listComponent } from '../../features/category/user_catgory_list/user_catgory_list.component';
@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		RouterModule,
		ProductListComponent,
		User_catgory_listComponent,
	],
	template: `
		<pre>
      Banner chính / Slider khuyến mãi
      Slide ảnh lớn ở đầu trang
      Dẫn tới sản phẩm hot / flash sale / bộ sưu tập mới
    </pre
		>

		<app-user_catgory_list></app-user_catgory_list>

		<app-product-list></app-product-list>
		<!-- <app-product-list2></app-product-list2> -->

		<pre>


3. 🛍 Danh sách sản phẩm nổi bật
Grid sản phẩm: ảnh, tên, giá, giảm giá, nút mua

Có thể phân nhóm:

🔥 Bán chạy

🆕 Hàng mới

⏰ Flash sale

4. 📢 Chương trình khuyến mãi
Dạng thẻ hoặc banner nhỏ

Mô tả ngắn + nút "Xem thêm"

5. ⭐ Feedback khách hàng / Đánh giá
Hiển thị bình luận thật

Avatar, tên, đánh giá, ảnh chụp thực tế

6. 📰 Blog / tin tức (tùy chọn)
Giúp SEO tốt hơn

Bài viết như “Cách chọn son phù hợp”, “Top 5 điện thoại giá rẻ”

7. 📞 Thông tin hỗ trợ & hotline
Cuối trang: Hotline, Chat, Email

Nút “Hỗ trợ ngay” hoặc Chatbox nổi
    </pre
		>
	`,
	styleUrl: './home.component.scss',
})
export class HomeComponent {}
