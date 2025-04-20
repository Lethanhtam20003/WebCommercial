package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

/**
 * Entity đại diện cho nhà cung cấp trong hệ thống
 * Lưu trữ thông tin liên hệ và chi tiết về nhà cung cấp sản phẩm
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "suppliers")
/**
 * thông tin nhà cung cấp
 */
public class Supplier {
    /**
     * ID của nhà cung cấp, tự động tăng
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_id")
    Long id;

    /**
     * Tên người liên hệ của nhà cung cấp, không được null
     */
    @Column(nullable = false)
    String contactName;

    /**
     * Số điện thoại liên hệ, không được null
     */
    @Column(nullable = false)
    String phone;

    /**
     * Email liên hệ, không được null
     */
    @Column(nullable = false)
    String email;

    /**
     * Địa chỉ của nhà cung cấp
     */
    String address;

    /**
     * Mô tả thêm về nhà cung cấp
     */
    String description;
}
