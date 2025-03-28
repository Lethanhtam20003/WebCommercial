package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.request.productReq.ProductRequest;
import com.nlu.WebThuongMai.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.awt.print.Pageable;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {
    @Mapping(source = "category.id", target = "categoryId")
    ProductRequest toProductRequest(Product request);
    // Sử dụng Page.map() để ánh xạ từng phần tử
    default Page<ProductRequest> toPageProductRequest(Page<Product> products) {
        return products.map(this::toProductRequest);
    }
}
