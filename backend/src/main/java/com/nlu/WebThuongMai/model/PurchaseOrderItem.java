package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "purchase_order_items")
/**
 * các sản phẩm của đơn hàng nhập kho
 */
public class PurchaseOrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_order_item_id")
    Long id;
    @ManyToOne
    @JoinColumn(name = "purchase_order_id", nullable = false)
    PurchaseOrder purchaseOrder;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    Product product;
    Integer quantity;
    BigDecimal unitPrice;
}
