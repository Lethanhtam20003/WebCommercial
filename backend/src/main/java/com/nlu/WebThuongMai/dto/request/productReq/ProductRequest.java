package com.nlu.WebThuongMai.dto.request.productReq;

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
public class ProductRequest {
    String name;
    Double price;
    String status;
    Set<Long> categoryIds;
    String description;
    Set<String> images;
}
