package com.nlu.WebThuongMai.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

/**
 * Class đại diện cho cấu trúc response chuẩn của API
 * @param <T> Kiểu dữ liệu của kết quả trả về
 */
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    /**
     * Mã trạng thái HTTP của response
     * Mặc định là 200 (Success)
     */
    @Builder.Default
    int code = 200;

    /**
     * Thông báo kèm theo response
     * Mặc định là "Success"
     */
    @Builder.Default
    String message = "Success";

    /**
     * Dữ liệu kết quả trả về
     * Có thể là null nếu không có dữ liệu
     */
    T result;
}
