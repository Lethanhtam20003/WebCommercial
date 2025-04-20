package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

/**
 * Entity đại diện cho danh mục sản phẩm trong hệ thống
 * Mỗi danh mục có thể chứa nhiều sản phẩm
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "categories")
public class Category {
    /**
     * ID của danh mục, tự động tăng
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    Long id;

    /**
     * Tên danh mục
     */
    String name;

    /**
     * Mô tả về danh mục
     */
    String description;

    /**
     * Danh sách các sản phẩm thuộc danh mục này
     * Quan hệ một-nhiều với bảng Product
     * Cascade ALL để tự động xử lý các thao tác với Product
     */
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    Set<Product> products;
}
