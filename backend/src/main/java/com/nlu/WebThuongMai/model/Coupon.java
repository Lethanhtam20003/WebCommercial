package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * Entity đại diện cho mã giảm giá trong hệ thống
 * Được sử dụng để giảm giá cho các đơn hàng
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "coupons")
public class Coupon {
    /**
     * ID của mã giảm giá, tự động tăng
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coupon_id")
    Long id;

    /**
     * Mã code của coupon, phải duy nhất và không được null
     */
    @Column(unique = true, nullable = false)
    String code;

    /**
     * Phần trăm giảm giá
     * Ví dụ: 10.0 tương đương giảm 10%
     */
    double discountPercentage;

    /**
     * Mô tả về mã giảm giá
     */
    String description;

    /**
     * Số lượng người dùng tối đa có thể sử dụng mã
     */
    int limitUser;

    /**
     * Thời điểm tạo mã giảm giá, tự động cập nhật
     */
    @CreationTimestamp
    LocalDateTime createdAt;

    /**
     * Thời điểm hết hạn của mã giảm giá
     */
    LocalDateTime expirationDate;
}
