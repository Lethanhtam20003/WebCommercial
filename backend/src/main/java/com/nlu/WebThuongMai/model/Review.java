package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "reviews")
/**
 * review và comment của khách hàng
 */
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    Long id;
    String content;
    Integer rating;
    LocalDateTime createdAt;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    Product product;
}
