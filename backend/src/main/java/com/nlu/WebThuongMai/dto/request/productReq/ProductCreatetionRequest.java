package com.nlu.WebThuongMai.dto.request.productReq;
import com.nlu.WebThuongMai.model.ProductStatistic;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductCreatetionRequest {
    String name;
    Double price;
    String status;
    Set<Long> categoryIds;
    String description;
    Set<String> images;
    ProductStatistic statistic;
}
