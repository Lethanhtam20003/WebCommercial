package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "products")
/**
 * sản phẩm
 */
public class Product {
    @Id
    @Column(name = "product_id")
    Long id;
    @Column(nullable = false)
    String name;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    List<ProductImage> image;
    String price;
    String description;
    String status;
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    Category category;
}
