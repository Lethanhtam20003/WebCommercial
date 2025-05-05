package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

/**
 * Entity đại diện cho hình ảnh của sản phẩm trong hệ thống
 * Lưu trữ các hình ảnh liên quan đến một sản phẩm cụ thể
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "product_images")
public class ProductImage {
    /**
     * ID của hình ảnh sản phẩm, tự động tăng
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_image_id")
    Long id;

    /**
     * Tên của hình ảnh
     */
    String name;

    /**
     * Đường dẫn hoặc dữ liệu của hình ảnh
     */
    String image;

    /**
     * ID của sản phẩm mà hình ảnh này thuộc về
     */
    long productId;
}
