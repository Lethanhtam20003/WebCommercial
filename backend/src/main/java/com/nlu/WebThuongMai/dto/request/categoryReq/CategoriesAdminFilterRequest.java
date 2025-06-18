package com.nlu.WebThuongMai.dto.request.categoryReq;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoriesAdminFilterRequest {

    /**
     * Tên danh mục cần tìm (có thể là tìm gần đúng)
     */
    String name;

    /**
     * Mô tả danh mục cần tìm (có thể là tìm gần đúng)
     */
    String description;
}
