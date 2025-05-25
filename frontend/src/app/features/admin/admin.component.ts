import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, AdminSidebarComponent],
  template: `
  <div class="d-flex">
    <app-admin-sidebar></app-admin-sidebar>
    <div class="flex-grow-1">
      <router-outlet></router-outlet>
    </div>
  </div>

  <pre>
     📊 Dashboard	Thống kê, biểu đồ tổng quan hệ thống
    👤 User Management	Danh sách người dùng, vai trò, trạng thái, reset password
    📦 Product Management	CRUD sản phẩm, danh mục, hình ảnh
    📜 Order Management	Danh sách đơn hàng, chi tiết, trạng thái, lọc
    💬 Feedback / Support	Xem & phản hồi đánh giá, báo lỗi
    🧑‍💻 Admin Account Mgmt	Quản lý tài khoản quản trị khác (nếu hệ thống có nhiều admin)
    ⚙️ Settings / Config	Cấu hình hệ thống, API key, SMTP... (nếu có)
    🔒 Role & Permission
</pre>
  `,
  styleUrls: ['./admin.component.scss'],

})
export class AdminComponent {
    constructor() {
        // Constructor logic if needed
    } 
}