package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.productReq.CategoryUpdateRequest;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.productResp.CategoryResponse;
import com.nlu.WebThuongMai.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    CategoryService categoryService;

    //Lấy danh sách tất cả danh mục có phân trang
    @GetMapping()
    public List<CategoryResponse> getAll() {
        return categoryService.getAll();
    }

    // lấy danh mục theo id
    @GetMapping("/{id}")
    public CategoryResponse getById( @PathVariable("id") long id){
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public ApiResponse<CategoryResponse> updateCategory(
            @PathVariable Long id,
            @RequestBody CategoryUpdateRequest request
    ) {
        CategoryResponse updated = categoryService.updateCategory(id, request);
        return ApiResponse.<CategoryResponse>builder()
                .result(updated).build();
    }


}
