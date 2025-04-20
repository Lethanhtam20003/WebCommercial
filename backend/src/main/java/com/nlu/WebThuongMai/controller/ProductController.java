package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.productReq.CategoryRequest;
import com.nlu.WebThuongMai.dto.request.productReq.ProductRequest;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@Slf4j

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@RestController
@RequestMapping("/v1/products")
public class ProductController {
    ProductService productService;

    /**
     * Lấy danh sách tất cả sản phẩm có phân trang
     * @param pageable Thông tin phân trang (số trang, số lượng mỗi trang)
     * @return Danh sách sản phẩm được phân trang
     */
    @GetMapping()
    ApiResponse<Page<ProductRequest>> getAllProduct(Pageable pageable) {
        return ApiResponse.<Page<ProductRequest>>builder()
                .result(productService.getAllProduct(pageable))
                .build();

    }

    /**
     * Lấy thông tin sản phẩm theo ID
     * @param productId ID của sản phẩm cần tìm
     * @return Thông tin chi tiết của sản phẩm
     */
    @PostMapping("/id")
    ApiResponse<ProductRequest> getProductById(@RequestBody long productId) {
        return ApiResponse.<ProductRequest>builder()
                .result(productService.getProductById(productId))
                .build();
    }

    /**
     * Lấy danh sách sản phẩm theo danh mục có phân trang
     * @param request Thông tin danh mục cần tìm
     * @param pageable Thông tin phân trang (số trang, số lượng mỗi trang)
     * @return Danh sách sản phẩm theo danh mục được phân trang
     */
    @PostMapping("/category")
    ApiResponse<Page<ProductRequest>> getProductByCategory(@RequestBody CategoryRequest request, Pageable pageable) {
        return ApiResponse.<Page<ProductRequest>>builder()
                .result(productService.getProductByCategory(request, pageable))
                .build();
    }

}
