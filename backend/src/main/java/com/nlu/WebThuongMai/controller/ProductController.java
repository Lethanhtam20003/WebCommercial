package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.productReq.CategoryRequest;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.model.Product;
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

    @GetMapping()
    ApiResponse<Page<Product>> getAllProduct(Pageable pageable){
        return ApiResponse.<Page<Product>>builder()
                .result(productService.getAllProduct(pageable))
                .build();

    }
    @PostMapping("/id")
    ApiResponse<Product> getProductById(@RequestBody IdRequest request){
        return ApiResponse.<Product>builder()
                .result(productService.getProductById(request))
                .build();
    }

    @PostMapping("/category")
    ApiResponse<Page<Product>> getProductByCategory(@RequestBody CategoryRequest request){
        return ApiResponse.<Page<Product>>builder()
                .result(productService.getProductByCategory(request))
                .build();
    }

}
