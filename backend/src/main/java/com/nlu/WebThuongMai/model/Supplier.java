package com.nlu.WebThuongMai.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
