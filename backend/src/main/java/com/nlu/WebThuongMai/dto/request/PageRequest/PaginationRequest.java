package com.nlu.WebThuongMai.dto.request.PageRequest;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaginationRequest {
    @Min(0)
    int page = 0;

    @Min(1)
    @Max(100)
    int size = 10;

    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Sort field không hợp lệ")
    String sortBy = "createdAt";

    @Pattern(regexp = "ASC|DESC", flags = Pattern.Flag.CASE_INSENSITIVE, message = "Direction phải là ASC hoặc DESC")
    String direction = "DESC";

    private String defaultSortField = "id"; // Mặc định là "id", override được nếu cần

    public Pageable toPageable() {
        return PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, defaultSortField));
    }
}
