package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.response.productResp.CategoryResponse;
import com.nlu.WebThuongMai.mapper.CategoryMapper;
import com.nlu.WebThuongMai.model.Category;
import com.nlu.WebThuongMai.repository.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    public CategoryResponse createCategory(String category) {
        Category cate = categoryRepository.findByName(category);
        if (cate != null) {
            return null;
        }
        return categoryMapper.toCategoryResponse(categoryRepository.save(Category.builder().name(category).build()));
    }

    public List<CategoryResponse> getAll() {
        return categoryMapper.toListCategoryResponse(categoryRepository.findAll());
    }

    public long getCategoryId(String category) {
        Category cate = categoryRepository.findByName(category);
        if (cate == null) {
            return -1;
        }
        return cate.getId();
    }


}
