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
@Table(name = "categories")
/**
 * các danh mục sản phẩm
 */
public class Category {
    @Id
    @Column(name = "category_id")
    Long id;
    String name;
    String description;
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    List<Product> products;

}
