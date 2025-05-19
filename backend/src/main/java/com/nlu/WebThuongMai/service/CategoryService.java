package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.response.productResp.CategoryResponse;
import com.nlu.WebThuongMai.mapper.CategoryMapper;
import com.nlu.WebThuongMai.repository.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    public List<CategoryResponse> getAll(){
        return categoryMapper.toListCategoryResponse(categoryRepository.findAll());
    }
}
