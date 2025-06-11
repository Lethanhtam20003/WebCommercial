package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
@Getter
@Setter
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)


@Entity
@Table(name = "product_statistics")
public class ProductStatistic {

    @Id
    Long productId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "product_id")
    Product product;

    int purchaseCount;  // số lượng mua

    int hot; // số lượng truy cập

    double averageRating;  // đánh giá trung bình

    public ProductStatistic(){
        this.purchaseCount = 0;
        this.hot = 0;
        this.averageRating = 0;
    }
}

