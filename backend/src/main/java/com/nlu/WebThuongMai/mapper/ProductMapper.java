package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.request.productReq.ProductRequest;
import com.nlu.WebThuongMai.dto.response.productResp.ProductResponse;
import com.nlu.WebThuongMai.model.Category;
import com.nlu.WebThuongMai.model.Product;
import com.nlu.WebThuongMai.model.ProductImage;
import org.mapstruct.*;
import org.springframework.data.domain.Page;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = {ProductImageMapper.class})
public interface ProductMapper {

    @Mapping(target = "categoryIds", expression = "java(mapCategoriesToIds(product.getCategories()))")
    @Mapping(target = "images", source = "images")
    ProductResponse toProductResponse(Product product);

    default Set<Long> mapCategoriesToIds(Set<Category> categories) {
        if (categories == null) return new HashSet<>();
        return categories.stream().map(Category::getId).collect(Collectors.toSet());
    }

    default Set<String> mapProductImagesToUrls(Set<ProductImage> images) {
        if (images == null) return new HashSet<>();
        return images.stream().map(ProductImage::getImage).collect(Collectors.toSet());
    }

    default Page<ProductResponse> toPageProductResponse(Page<Product> products) {
        return products.map(this::toProductResponse);
    }


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "categories", expression = "java(toCategorySet(product.getCategoryIds()))")
    @Mapping(target = "images", expression = "java(toProductImageSet(product.getImages()))")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "price", source = "price")
    @Mapping(target = "description", source = "description")
    Product toProduct(ProductRequest product);

    default Set<Category> toCategorySet(Set<Long> ids) {
        if (ids == null) return new HashSet<>();
        return ids.stream()
                .map(id -> Category.builder().id(id).build())
                .collect(Collectors.toSet());
    }

    default Set<ProductImage> toProductImageSet(Set<String> urls) {
        if (urls == null) return new HashSet<>();
        return urls.stream()
                .filter(url -> url != null && !url.isBlank())
                .map(url -> {
                    if (url.contains("?"))
                        url = url.substring(0, url.lastIndexOf("?"));
                    return ProductImage.builder()
                            .name(getNameImage(url))
                            .image(url.trim()).build();
                })
                .collect(Collectors.toSet());
    }

    default String getNameImage(String url) {
        if (url == null || url.isBlank()) return null;
        StringBuilder res = new StringBuilder();
        res.append(url.substring(url.lastIndexOf("/") + 1));
        if (url.contains("?"))
            res.deleteCharAt(res.lastIndexOf("?"));
        return res.toString();
    }

    @AfterMapping
    default void linkImages(@MappingTarget Product product) {
        if (product.getImages() != null) {
            product.getImages()
                    .forEach(img -> img.setProduct(product));
        }
    }

}
