package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

/**
 * Entity đại diện cho đánh giá và nhận xét của khách hàng về sản phẩm
 * Lưu trữ thông tin về điểm đánh giá và nội dung bình luận
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "reviews")
public class Review {
    /**
     * ID của đánh giá, tự động tăng
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    Long id;

    /**
     * Nội dung bình luận của khách hàng
     */
    String content;

    /**
     * Số sao đánh giá (thường từ 1-5)
     */
    Integer rating;

    /**
     * Thời điểm tạo đánh giá
     */
    LocalDateTime createdAt;

    /**
     * Người dùng tạo đánh giá
     * Quan hệ nhiều-một với bảng User
     */
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    /**
     * Sản phẩm được đánh giá
     * Quan hệ nhiều-một với bảng Product
     */
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    Product product;
}
