package com.nlu.WebThuongMai.dto.response.productResp;

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
public class ProductResponse {
    long id;
    String name;
    double price;
    String status;
    Set<Long> categoryIds;
    String description;
    Set<String> images;
}
