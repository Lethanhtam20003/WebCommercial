package com.nlu.WebThuongMai.model;

import com.nlu.WebThuongMai.enums.CurrencyType;
import com.nlu.WebThuongMai.enums.PaymentMethod;
import com.nlu.WebThuongMai.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    Long id;
    @Column(nullable = false, unique = true)

    String paypalOrderId;       // ID từ PayPal

    @ManyToOne(fetch = FetchType.LAZY)
            @JoinColumn(name = "user_id")
    User user;         // Payer ID

    @OneToOne(mappedBy = "payment", cascade = CascadeType.ALL)
    Order order;         // ID đơn hàng trong hệ thống của bạn
    @Enumerated(EnumType.STRING)
            @Builder.Default
    PaymentMethod paymentMethod = PaymentMethod.PAYPAL;   // PayPal, VNPAY, COD, etc.

    @Enumerated(EnumType.STRING)
            @Builder.Default
    PaymentStatus status = PaymentStatus.PENDING;          // CREATED, APPROVED, COMPLETED, FAILED
    BigDecimal amount;

    @Enumerated(EnumType.STRING)
            @Builder.Default
    CurrencyType currency = CurrencyType.USD;        // "USD"

    @CreationTimestamp
    LocalDateTime createdAt;
    @UpdateTimestamp
    LocalDateTime updatedAt;
}
