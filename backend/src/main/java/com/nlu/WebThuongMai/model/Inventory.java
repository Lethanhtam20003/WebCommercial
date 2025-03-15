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
@Table(name = "inventories")
/**
 * kho hang
 */
public class Inventory {
    @Id
    @Column(name = "inventory_id")
    String id;
    @ManyToOne
            @JoinColumn(name = "product_id",nullable = false)
    Product product;

    int quantity;
}
