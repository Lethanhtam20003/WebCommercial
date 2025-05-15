package com.nlu.WebThuongMai.model;

import com.nlu.WebThuongMai.enums.AuthProvider;
import com.nlu.WebThuongMai.enums.Gender;
import com.nlu.WebThuongMai.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Entity đại diện cho người dùng trong hệ thống
 * Lưu trữ thông tin cá nhân và xác thực của người dùng
 */
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "users")
public class User {
    /**
     * ID của người dùng, tự động tăng
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    long id;

    /**
     * Tên đăng nhập, không được null và phải duy nhất
     */
    @Column(nullable = false, unique = true)
    String username;

    /**
     * Mật khẩu của người dùng
     */
    String password;

    /**
     * Email của người dùng, không được null và phải duy nhất
     */
    @Column(unique = true)
    String email;

    /**
     * Số điện thoại của người dùng, phải duy nhất
     */
    @Column(unique = true)
    String phone;

    /**
     * Nhà cung cấp xác thực (LOCAL, FACEBOOK, GOOGLE, etc.)
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "auth_provider")
    AuthProvider authProvider;

    /**
     * ID của người dùng từ nhà cung cấp xác thực
     */
    @Column(name = "provider_id")
    String authProviderId;

    /**
     * Họ tên đầy đủ của người dùng
     */
    String fullName;

    /**
     * URL ảnh đại diện của người dùng
     */
    @Column(length = 2000)
    String avatar;

    /**
     * Ngày sinh của người dùng
     */
    LocalDate birthday;

    /**
     * Địa chỉ của người dùng
     */
    String address;

    /**
     * Giới tính của người dùng (MALE, FEMALE, OTHER)
     */
    @Enumerated(EnumType.STRING)
    Gender gender;

    /**
     * Vai trò của người dùng trong hệ thống (ADMIN, USER, etc.)
     */
    @Enumerated(EnumType.STRING)
    Role role;

    /**
     * Trạng thái tài khoản của người dùng
     */
    String status;

    /**
     * Danh sách mã giảm giá của người dùng
     */
    String coupons;

    /**
     * Thời điểm tạo tài khoản, tự động cập nhật
     */
    @CreationTimestamp
    LocalDateTime created_at;

    /**
     * Thời điểm cập nhật thông tin gần nhất
     */
    LocalDateTime updated_at;
}
