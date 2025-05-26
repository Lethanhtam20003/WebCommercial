package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

/**
 * Entity đại diện cho thông tin tồn kho của sản phẩm
 * Quản lý số lượng tồn kho của từng sản phẩm trong hệ thống
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "inventories")
public class Inventory {
    /**
     * ID của bản ghi tồn kho, tự động tăng
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_id")
    long id;

    /**
     * Sản phẩm được quản lý tồn kho
     * Quan hệ nhiều-một với bảng Product
     */
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    Product product;

    /**
     * Số lượng sản phẩm hiện có trong kho
     */
    @Column(nullable = false)
    int quantity;
}
