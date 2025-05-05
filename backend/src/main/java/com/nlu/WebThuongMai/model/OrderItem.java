package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

/**
 * Entity đại diện cho một mặt hàng trong đơn hàng
 * Lưu trữ thông tin chi tiết về số lượng và giá của từng sản phẩm trong đơn hàng
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "order_items")
public class OrderItem {
    /**
     * ID của mặt hàng trong đơn hàng, tự động tăng
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    Long id;

    /**
     * Sản phẩm được đặt mua
     * Quan hệ nhiều-một với bảng Product
     */
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    Product product;

    /**
     * Đơn hàng chứa mặt hàng này
     * Quan hệ nhiều-một với bảng Order
     */
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    Order order;

    /**
     * Số lượng sản phẩm được đặt mua
     */
    Integer quantity;

    /**
     * Giá của sản phẩm tại thời điểm đặt hàng
     */
    BigDecimal price;
}
