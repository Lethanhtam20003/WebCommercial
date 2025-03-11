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
    @Column(name = "product_image_id")
    Long id;
    String name;
    String image;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    Product product;

}
