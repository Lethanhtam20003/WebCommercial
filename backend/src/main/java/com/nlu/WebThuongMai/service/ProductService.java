package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.productReq.CategoryRequest;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.model.Product;
import com.nlu.WebThuongMai.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@Service
public class ProductService {
    ProductRepository productRepository;


    public Page<Product> getAllProduct(Pageable pageable){
        return productRepository.findAll(pageable);
    }

    public Product getProductById(IdRequest request){
        return productRepository.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
    }

    public Page<Product> getProductByCategory(CategoryRequest request){
        return productRepository.findByCategory(request.getCategory(),
                PageRequest.of(request.getPageNum(), request.getPageSize()));
    }

}
