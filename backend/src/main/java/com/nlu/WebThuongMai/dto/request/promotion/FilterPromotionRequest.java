package com.nlu.WebThuongMai.dto.request.promotion;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nlu.WebThuongMai.dto.request.PageRequest.PaginationRequest;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FilterPromotionRequest extends PaginationRequest {
    @Size(min = 1, max = 100, message = "Tên khuyến mãi tối đa 100 ký tự")
    String name;
    @PastOrPresent(message = "Ngày bắt đầu không được sau ngày hiện tại")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    LocalDate startDateFrom;
    @FutureOrPresent(message = "Ngày kết thúc phải là hôm nay hoặc tương lai")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    LocalDate endDateTo;
    @DecimalMin(value = "0.0", inclusive = true, message = "Giảm giá tối thiểu phải >= 0%")
    @DecimalMax(value = "100.0", inclusive = true, message = "Giảm giá tối đa là 100%")
    String minDiscount;
}
