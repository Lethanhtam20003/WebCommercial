package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

/**
 * Entity đại diện cho sản phẩm trong hệ thống
 * Lưu trữ thông tin chi tiết về sản phẩm và mối quan hệ với danh mục
 */
@Getter
@Setter
@ToString
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
     * Trạng thái của sản phẩm (mở bán , ngừng bán, etc.)
     */
    String status;

    // Quan hệ nhiều ảnh
    @Builder.Default
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<ProductImage> images = new HashSet<>();

    // Quan hệ nhiều-danh mục
    @Builder.Default
    @ManyToMany
    @JoinTable(
            name = "product_categories",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    Set<Category> categories = new HashSet<>();

}
