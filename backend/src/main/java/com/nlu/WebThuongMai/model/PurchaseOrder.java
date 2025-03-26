package com.nlu.WebThuongMai.model;

import com.nlu.WebThuongMai.enums.PurchaseStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "purchase_orders")
/**
 * đơn hàng nhập vào kho
 */
public class PurchaseOrder {
    @Id
    @Column(name = "purchase_order_id")
    Long id;
    @ManyToOne
    @JoinColumn(name = "suppler_id", nullable = false)
    Supplier supplier;
    @CreationTimestamp
    LocalDateTime createdAt;
    @Enumerated(EnumType.STRING)
    @Builder.Default
    PurchaseStatus status = PurchaseStatus.PENDING;
    BigDecimal totalPrice;

}
