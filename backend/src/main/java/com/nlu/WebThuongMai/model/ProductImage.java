package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "product_images")
/**
 * ảnh của sản phẩm
 */
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_image_id")
    Long id;
    String name;
    String image;
    long productId;

}
