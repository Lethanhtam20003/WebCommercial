package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.productReq.CategoryRequest;
import com.nlu.WebThuongMai.dto.request.productReq.ProductRequest;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.mapper.ProductMapper;
import com.nlu.WebThuongMai.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@Service
public class ProductService {
    ProductRepository productRepository;
    ProductMapper productMapper;

    public Page<ProductRequest> getAllProduct(Pageable pageable) {
        return productMapper.toPageProductRequest(productRepository.findAll(pageable));
    }

    public ProductRequest getProductById(long request) {
        return productMapper.toProductRequest(productRepository.findById(request)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND)));
    }

    public Page<ProductRequest> getProductByCategory(CategoryRequest request, Pageable pageable) {
        return productMapper.toPageProductRequest(productRepository.findByCategory(request.getCategory(), pageable));
    }

}
