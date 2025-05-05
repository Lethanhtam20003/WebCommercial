# Tổng Quan Dự Án Web Thương Mại

## 1. Kiến trúc Backend (Spring Boot)

### Cấu trúc package:
- `configuration`: Cấu hình hệ thống
- `controller`: REST API endpoints
- `service`: Business logic
- `repository`: Data access layer
- `model`: Entity classes
- `dto`: Data Transfer Objects
- `mapper`: Chuyển đổi giữa DTO và Entity
- `exception`: Xử lý ngoại lệ
- `validator`: Validation logic
- `enums`: Các enum

### Các Entity chính:
1. `User`: Quản lý người dùng
2. `Product`: Sản phẩm
3. `Category`: Danh mục sản phẩm
4. `Order` & `OrderItem`: Đơn hàng và chi tiết đơn
5. `PurchaseOrder` & `PurchaseOrderItem`: Đơn nhập hàng
6. `Inventory`: Quản lý kho
7. `Review`: Đánh giá sản phẩm
8. `Supplier`: Nhà cung cấp
9. `Coupon`: Mã giảm giá
10. `ProductImage`: Hình ảnh sản phẩm
11. `InvalidatedToken`: Quản lý token hết hạn

### Tính năng Backend:
- REST API
- Spring Security với JWT
- OAuth2 (Facebook login)
- PostgreSQL database
- File upload/download
- Token management

## 2. Kiến trúc Frontend (Angular)

### Cấu trúc thư mục:
- `components`: Các component tái sử dụng
- `pages`: Các trang chính
- `services`: Gọi API và xử lý logic
- `models`: Interface/Type definitions
- `core`: Core functionality
- `constant`: Constants/Configurations
- `rules`: Business rules

### Công nghệ sử dụng:
- Angular latest version
- NG-ZORRO (Ant Design)
- TypeScript
- RxJS

## 3. Tính năng chính của hệ thống:

### 3.1. Quản lý sản phẩm:
- CRUD sản phẩm
- Phân loại danh mục
- Quản lý hình ảnh
- Quản lý tồn kho

### 3.2. Quản lý đơn hàng:
- Đặt hàng
- Xử lý đơn hàng
- Quản lý đơn nhập hàng
- Áp dụng mã giảm giá

### 3.3. Quản lý người dùng:
- Đăng ký/Đăng nhập
- OAuth2 với Facebook
- Phân quyền người dùng
- JWT authentication

### 3.4. Tính năng bổ sung:
- Đánh giá sản phẩm
- Quản lý nhà cung cấp
- Quản lý kho
- Mã giảm giá

## 4. Bảo mật:
- JWT Token
- Refresh Token
- Token invalidation
- OAuth2 integration
- Role-based access control

## 5. Database:
- PostgreSQL
- JPA/Hibernate
- Relationship mapping
- Transaction management

## 6. Cấu hình và Port:
- Backend: localhost:8080 với context path /api
- Frontend: localhost:4200
- Database: PostgreSQL trên port 5432

## 7. Đặc điểm nổi bật:
- Kiến trúc hiện đại với Spring Boot và Angular
- Tích hợp đăng nhập mạng xã hội
- Hệ thống bảo mật mạnh mẽ
- Quản lý token linh hoạt
- Giao diện người dùng thân thiện với Ant Design
- Khả năng mở rộng tốt
- Tuân thủ các best practices 