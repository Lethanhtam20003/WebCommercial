# 🛒 Hệ Thống Web Bán Hàng Thể Thao - Fullstack (Spring Boot + Angular)

## 📌 1. Mô tả tóm tắt

Dự án này là một hệ thống **Web bán hàng thể thao** với kiến trúc **Fullstack**, bao gồm:

- ✨ **Backend**: Phát triển bằng Spring Boot
- 💻 **Frontend**: Sử dụng Angular + Ant Design (NG-ZORO)

### 🧩 Chức năng chính:

- Quản lý sản phẩm, danh mục, đơn hàng, người dùng
- Chức năng xác thực và phân quyền người dùng
- Giao diện hiện đại, dễ sử dụng

---

## 🧰 2. Công nghệ sử dụng

### 🔙 Backend (API Server)

| Công nghệ         | Mô tả |
|-------------------|-------|
| **Spring Boot**   | Framework chính để phát triển RESTful API |
| **Spring Security** | Xác thực và phân quyền người dùng |
| **JWT** (JSON Web Token) | Xác thực người dùng bằng token |
| **Refresh Token** | Hỗ trợ làm mới token khi hết hạn |
| **PostgreSQL**    | Cơ sở dữ liệu quan hệ để lưu trữ thông tin |
| **Docker**        | Đóng gói và triển khai backend |

---

### 🎨 Frontend (UI/UX)

| Công nghệ             | Mô tả |
|------------------------|------|
| **Angular**            | Framework frontend hiện đại |
| **NG-ZORO (Ant Design)** | Thư viện UI xây dựng giao diện đẹp, tiện dụng |

---

## 🔒 Ưu điểm hệ thống

- ✅ Bảo mật với JWT & phân quyền rõ ràng
- ⚡ Hiệu năng cao nhờ REST API tối ưu
- 📦 Dễ dàng mở rộng & triển khai bằng Docker
- 🧑‍💻 Trải nghiệm người dùng mượt mà với giao diện đẹp mắt

---

## 🚀 Sẵn sàng để triển khai!

Hệ thống được thiết kế để dễ dàng mở rộng, tích hợp và triển khai trong môi trường thực tế.
--- 
quy trình chuẩn để thực hiện OAuth2 login (bao gồm Facebook, Google, v.v.) theo chuẩn Spring Security:

## Frontend:

-Gửi người dùng đến endpoint đăng nhập của nhà cung cấp OAuth2 (ví dụ: Facebook, Google).

-Redirect người dùng đến URL đăng nhập của Facebook/Google, nơi họ sẽ nhập thông tin đăng nhập và cấp quyền cho ứng dụng.

Backend:

-Sau khi người dùng đăng nhập thành công, nhà cung cấp OAuth2 (Facebook/Google) sẽ redirect lại về backend của bạn
 với một mã authorization code.

-Backend nhận mã này và gửi yêu cầu đến nhà cung cấp OAuth2 để trao đổi mã authorization code lấy access token.

-Backend sử dụng access token để lấy thông tin người dùng từ nhà cung cấp OAuth2.

-Backend kiểm tra, xác thực và xử lý thông tin người dùng (ví dụ: tạo mới tài khoản, đăng nhập người dùng).

-Backend trả về thông tin người dùng cho frontend hoặc tạo một phiên làm việc (session) để duy trì trạng thái
đăng nhập của người dùng.

## Frontend:

-Sau khi backend xử lý và xác thực thông tin người dùng, frontend có thể nhận thông tin người dùng (như tên, email)
từ backend và hiển thị cho người dùng.

-Frontend sẽ lưu thông tin đăng nhập (thông qua session hoặc JWT token) để người dùng không phải đăng nhập lại mỗi
lần truy cập.
