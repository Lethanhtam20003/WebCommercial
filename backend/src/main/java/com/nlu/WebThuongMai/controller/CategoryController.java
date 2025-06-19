package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.categoryReq.CategoriesAdminFilterRequest;
import com.nlu.WebThuongMai.dto.request.categoryReq.CreateCategoryRequest;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.productResp.CategoryResponse;
import com.nlu.WebThuongMai.service.CategoryService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public CategoryResponse getById(@PathVariable("id") long id) {
        return categoryService.getCategoryById(id);
    }

    @PostMapping("/admin/filter")
    public ApiResponse<Page<CategoryResponse>> filterCategoriesAdmin(
            @RequestBody CategoriesAdminFilterRequest request,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ApiResponse.<Page<CategoryResponse>>builder()
                .result(categoryService.filterCategories(request, pageable))
                .build();
    }

    @PostMapping("/admin/create")
    public ApiResponse<CategoryResponse> createCategory(@Valid @RequestBody CreateCategoryRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.createNewCategory(request))
                .build();
    }
}
