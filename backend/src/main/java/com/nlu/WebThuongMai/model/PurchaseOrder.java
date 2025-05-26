package com.nlu.WebThuongMai.model;

import com.nlu.WebThuongMai.enums.PurchaseStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Entity đại diện cho đơn đặt hàng từ nhà cung cấp
 * Quản lý việc nhập hàng vào kho từ các nhà cung cấp
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "purchase_orders")
public class PurchaseOrder {
    /**
     * ID của đơn đặt hàng, tự động tăng
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_order_id")
    Long id;

    /**
     * Nhà cung cấp của đơn hàng
     * Quan hệ nhiều-một với bảng Supplier
     */
    @ManyToOne
    @JoinColumn(name = "suppler_id", nullable = false)
    Supplier supplier;

    /**
     * Thời điểm tạo đơn đặt hàng, tự động cập nhật
     */
    @CreationTimestamp
    LocalDateTime createdAt;

    /**
     * Trạng thái của đơn đặt hàng
     * Mặc định là PENDING (chờ xử lý)
     */
    @Enumerated(EnumType.STRING)
    @Builder.Default
    PurchaseStatus status = PurchaseStatus.PENDING;

    /**
     * Tổng giá trị của đơn đặt hàng
     */
    BigDecimal totalPrice;

    /**
     * Danh sách các sản phẩm đã đặt hàng
     */
    @OneToMany(mappedBy = "purchaseOrder", cascade = CascadeType.ALL)
    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    Set<PurchaseOrderItem> purchaseOrderItems = new HashSet<>();
}
