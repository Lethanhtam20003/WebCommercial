package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

/**
 * Entity đại diện cho sản phẩm trong hệ thống
 * Lưu trữ thông tin chi tiết về sản phẩm và mối quan hệ với danh mục
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "products")
public class Product {
    /**
     * ID của sản phẩm, tự động tăng
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    Long id;

    /**
     * Tên sản phẩm, không được null
     */
    @Column(nullable = false)
    String name;

    /**
     * Giá sản phẩm
     */
    String price;

    /**
     * Mô tả chi tiết về sản phẩm
     */
    String description;

    /**
     * Trạng thái của sản phẩm (còn hàng, hết hàng, etc.)
     */
    String status;

    /**
     * Danh mục của sản phẩm
     * Quan hệ nhiều-một với bảng Category
     */
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    Category category;
}
