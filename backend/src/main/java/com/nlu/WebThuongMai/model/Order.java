package com.nlu.WebThuongMai.model;

import com.nlu.WebThuongMai.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "orders")
/**
 * 1 đơn hàng được tạo ra cho 1 user bất kỳ
 * 1 đơn hàng chứa các sản phẩm 
 */
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    Long id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;
    BigDecimal totalPrice;
    BigDecimal discountedPrice;
    @Builder.Default
    @Enumerated(EnumType.STRING)
    OrderStatus status = OrderStatus.PENDING;
    String note;
    @CreationTimestamp
    LocalDateTime createdDate;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<OrderItem> orderItems;// 1 đơn hàng có nhiều sản phầm các sản phẩm ko dc trùng nhau, nếu trùng thì tăng số lượng
}
