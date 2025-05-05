package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

/**
 * Entity đại diện cho chi tiết sản phẩm trong đơn đặt hàng từ nhà cung cấp
 * Lưu trữ thông tin về số lượng và đơn giá của từng sản phẩm trong đơn đặt hàng
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "purchase_order_items")
public class PurchaseOrderItem {
    /**
     * ID của chi tiết đơn đặt hàng, tự động tăng
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_order_item_id")
    Long id;

    /**
     * Đơn đặt hàng chứa sản phẩm này
     * Quan hệ nhiều-một với bảng PurchaseOrder
     */
    @ManyToOne
    @JoinColumn(name = "purchase_order_id", nullable = false)
    PurchaseOrder purchaseOrder;

    /**
     * Sản phẩm được đặt mua
     * Quan hệ nhiều-một với bảng Product
     */
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    Product product;

    /**
     * Số lượng sản phẩm cần đặt mua
     */
    Integer quantity;

    /**
     * Đơn giá của sản phẩm khi đặt mua từ nhà cung cấp
     */
    BigDecimal unitPrice;
}
