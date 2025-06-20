package com.nlu.WebThuongMai.dto.request.categoryReq;

import jakarta.validation.constraints.Size;
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
    @Size(min = 1, max = 100, message = "Tên danh mục tối đa 100 ký tự")
    String name;

    /**
     * Mô tả danh mục cần tìm (có thể là tìm gần đúng)
     */
    @Size(min = 1, max = 255, message = "Mô tả danh mục tối đa 255 ký tự")
    String description;
}
