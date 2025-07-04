package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.productReq.ProductCreatetionRequest;
import com.nlu.WebThuongMai.dto.request.productReq.ProductFilterRequest;
import com.nlu.WebThuongMai.dto.request.productReq.ProductUpdateRequest;
import com.nlu.WebThuongMai.dto.response.productResp.ProductResponse;
import com.nlu.WebThuongMai.enums.ProductStatus;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.mapper.ProductMapper;
import com.nlu.WebThuongMai.model.*;
import com.nlu.WebThuongMai.repository.ProductRepository;
import com.nlu.WebThuongMai.repository.PromotionRepository;
import jakarta.persistence.criteria.Join;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

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
    PromotionRepository promotionRepository;

    public ProductResponse createProduct(ProductCreatetionRequest request) {
        log.info("Create product: {}", request);
        if (productRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.PRODUCT_EXISTED);
        }
        Product p = productMapper.productCreationRequestToProduct(request);
        p.setStatistic(ProductStatistic.builder().product(p).build());
        return productMapper.toProductResponse(productRepository
                .save(p));
    }

    public Page<ProductResponse> getAllProduct(ProductFilterRequest filter, Pageable pageable) {
        Specification<Product> spec = Specification.where(null);
        if (!hasRole("ADMIN")) {
            spec = spec.and((root, query, cb) -> {
                Join<Product, Inventory> inventoryJoin = root.join("inventories");
                return cb.gt(inventoryJoin.get("quantity"), 0);
            });
        }

        // Nếu không truyền filter.status thì mặc định là ACTIVE
        if (filter.getStatus() != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("status"), filter.getStatus())
            );
        } else {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("status"), ProductStatus.ACTIVE)
            );
        }

        if (filter.getName() != null && !filter.getName().isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("name")), "%" + filter.getName().toLowerCase() + "%")
            );
        }

        if (filter.getCategoryId() != null && filter.getCategoryId().length > 0) { // Hoặc !filter.getCategoryIds().isEmpty() nếu là List
            spec = spec.and((root, query, cb) -> {
                Join<Product, Category> join = root.join("categories");
                return join.get("id").in(Arrays.asList(filter.getCategoryId()));
            });
        }

        if (filter.getStatus() != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("status"), filter.getStatus())
            );
        }

        if (filter.getMinPrice() != null) {
            spec = spec.and((root, query, cb) ->
                    cb.ge(root.get("price"), filter.getMinPrice())
            );
        }

        if (filter.getMaxPrice() != null) {
            spec = spec.and((root, query, cb) ->
                    cb.le(root.get("price"), filter.getMaxPrice())
            );
        }

        return productMapper.toPageProductResponse(productRepository.findAll(spec,pageable));
    }


    public ProductResponse getProductById(long request) {
        return productMapper.toProductResponse(productRepository.findById(request)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND)));
    }

    public Page<ProductResponse> getProductByCategory(String category, Pageable pageable) {
        return productMapper.toPageProductResponse(productRepository.findByCategoryName(category, pageable));
    }

    public Boolean checkName(String name) {
        return productRepository.existsByName(name);
    }

    @Transactional(readOnly = true)
    public Product findProductById(Long id) {
        return productRepository.findByIdWithAllRelations(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
    }

    private boolean hasRole(String role) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info(authentication.getAuthorities().stream().toList().toString());
        return authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals(role));
    }


    public ProductResponse updateProduct(long id, ProductUpdateRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setStatus(ProductStatus.valueOf(request.getStatus()));

        // Xử lý promotions: chỉ giữ duy nhất 1 khuyến mãi được chọn
        product.getPromotions().clear(); // Xoá các khuyến mãi cũ

        if (request.getPromotionId() != null) {
            Promotion promotion = promotionRepository.findById(request.getPromotionId())
                    .orElseThrow(() -> new AppException(ErrorCode.PROMOTION_NOT_FOUND));
            product.getPromotions().add(promotion); // Thêm mới khuyến mãi
        }

        productRepository.save(product);
        return productMapper.toProductResponse(product);
    }

}
