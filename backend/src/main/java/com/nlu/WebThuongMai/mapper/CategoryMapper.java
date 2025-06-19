package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.request.categoryReq.CreateCategoryRequest;
import com.nlu.WebThuongMai.dto.response.productResp.CategoryResponse;
import com.nlu.WebThuongMai.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {
    CategoryResponse toCategoryResponse(Category category);
    CategoryResponse toCategoryResponse(CreateCategoryRequest request);

    List<CategoryResponse> toListCategoryResponse(List<Category> categories);
}
