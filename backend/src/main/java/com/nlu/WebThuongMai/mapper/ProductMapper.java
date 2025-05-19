package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.request.productReq.ProductRequest;
import com.nlu.WebThuongMai.model.Category;
import com.nlu.WebThuongMai.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {
    @Mapping(target = "categoryIds", expression = "java(mapCategoriesToIds(product.getCategories()))")
    ProductRequest toProductRequest(Product product);

    default Set<Long> mapCategoriesToIds(Set<Category> categories) {
        if (categories == null) return new HashSet<>();
        return categories.stream().map(Category::getId).collect(Collectors.toSet());
    }

    // Sử dụng Page.map() để ánh xạ từng phần tử
    default Page<ProductRequest> toPageProductRequest(Page<Product> products) {
        return products.map(this::toProductRequest);
    }
    @Mapping(target = "categories", expression = "java(toCategorySet(product.getCategoryIds()))")
    Product toProduct(ProductRequest product);

    default Set<Category> toCategorySet(Set<Long> ids) {
        if (ids == null) return new HashSet<>();
        return ids.stream()
                .map(id -> Category.builder().id(id).build())
                .collect(Collectors.toSet());
    }
}
