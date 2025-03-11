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
@Table(name = "order_items")
/**
 * 1 sản phẩm của một đơn hàng
 */
public class OrderItem {
    @Id
    @Column(name = "order_item_id")
    Long id;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    Product product;
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    Order order;
    Integer quantity;
    BigDecimal price;

}
