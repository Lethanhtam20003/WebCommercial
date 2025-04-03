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
@Table(name = "suppliers")
/**
 * thông tin nhà cung cấp
 */
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_id")
    Long id;
    @Column(nullable = false)
    String contactName;
    @Column(nullable = false)
    String phone;
    @Column(nullable = false)
    String email;
    String address;
    String description;
}
