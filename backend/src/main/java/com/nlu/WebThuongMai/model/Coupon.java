package com.nlu.WebThuongMai.model;

import com.nlu.WebThuongMai.enums.CouponStatus;
import com.nlu.WebThuongMai.enums.CouponType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
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
    double discount;

    /**
     * Mô tả về mã giảm giá
     */
    String description;

    /**
     * Số lượng người dùng tối đa có thể sử dụng mã
     */
    int limitUsers;

    /**
     * Thời điểm tạo mã giảm giá, tự động cập nhật
     */
    @CreationTimestamp
    LocalDateTime createdAt;

    /**
     * Thời điểm hết hạn của mã giảm giá
     */
    LocalDateTime expirationDate;

    /**
     * Trạng thái của mã giảm giá
     * Mặc định là ACTIVE (trạng thái hoạt động)
     */
    @Enumerated(EnumType.STRING)
    @Builder.Default
    CouponStatus status = CouponStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    CouponType type = CouponType.PERCENTAGE;

    /**
     * điều kiện áp dụng mã giảm giá
     */
    BigDecimal priceCondition;
    /**
     * số tiền tối thiểu mà mã giả giá có thể áp dụng
     */
    BigDecimal minPrice;


}
