package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.productReq.CategoryRequest;
import com.nlu.WebThuongMai.dto.request.productReq.ProductRequest;
import com.nlu.WebThuongMai.dto.response.productResp.ProductResponse;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.mapper.ProductMapper;
import com.nlu.WebThuongMai.model.Product;
import com.nlu.WebThuongMai.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service xử lý các chức năng liên quan đến sản phẩm.
 * Cung cấp các phương thức để truy xuất và quản lý thông tin sản phẩm,
 * bao gồm tìm kiếm theo danh mục, phân trang và lấy chi tiết sản phẩm.
 */
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
public class ProductService {
    ProductRepository productRepository;
    ProductMapper productMapper;

    public ProductResponse createProduct(ProductRequest request) {
        log.info("Create product: {}", request);
        if (productRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.PRODUCT_EXISTED);
        }
        return productMapper.toProductResponse(productRepository
                .save(productMapper.toProduct(request)));
    }

    public Page<ProductResponse> getAllProduct(Pageable pageable) {
        return productMapper.toPageProductResponse(productRepository.findAll(pageable));
    }

    public ProductResponse getProductById(long request) {
        return productMapper.toProductResponse(productRepository.findById(request)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND)));
    }

    public Page<ProductResponse> getProductByCategory(CategoryRequest request, Pageable pageable) {
        return productMapper.toPageProductResponse(productRepository.findByCategoryName(request.getCategory(), pageable));
    }

    public Boolean checkName(String name) {
        return productRepository.existsByName(name);
    }

    public Product findProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
    }
}
