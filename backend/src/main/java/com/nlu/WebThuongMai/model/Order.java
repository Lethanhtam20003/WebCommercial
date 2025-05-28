package com.nlu.WebThuongMai.model;

import com.nlu.WebThuongMai.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * Entity đại diện cho đơn hàng trong hệ thống
 * Một đơn hàng thuộc về một người dùng và chứa nhiều sản phẩm
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "orders")
/**
 * 1 đơn hàng được tạo ra cho 1 user bất kỳ
 * 1 đơn hàng chứa các sản phẩm 
 */
public class    Order {
    /**
     * ID của đơn hàng, tự động tăng
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    Long id;

    /**
     * Người dùng tạo đơn hàng
     * Quan hệ nhiều-một với bảng User
     */
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    /**
     * Tổng giá trị đơn hàng trước khi giảm giá
     */
    BigDecimal totalPrice;

    /**
     * Giá trị đơn hàng sau khi áp dụng giảm giá
     */
    BigDecimal discountedPrice;

    /**
     * Trạng thái của đơn hàng
     * Mặc định là PENDING (chờ xử lý)
     */
    @Builder.Default
    @Enumerated(EnumType.STRING)
    OrderStatus status = OrderStatus.PENDING;

    /**
     * Ghi chú cho đơn hàng
     */
    String note;

    /**
     * Thời điểm tạo đơn hàng, tự động cập nhật
     */
    @CreationTimestamp
    LocalDateTime createdDate;

    /**
     * Danh sách các sản phẩm trong đơn hàng
     * Quan hệ một-nhiều với bảng OrderItem
     * Cascade ALL để tự động xử lý các thao tác với OrderItem
     * Lazy loading để tối ưu hiệu suất
     */
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<OrderItem> orderItems;// 1 đơn hàng có nhiều sản phầm các sản phẩm ko dc trùng nhau, nếu trùng thì tăng số lượng

    /**
     * Coupon được áp dụng cho đơn hàng này
     */
    @ManyToOne
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;

}
