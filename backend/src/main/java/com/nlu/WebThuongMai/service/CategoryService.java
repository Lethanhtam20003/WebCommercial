package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.categoryReq.CategoriesAdminFilterRequest;
import com.nlu.WebThuongMai.dto.request.categoryReq.CreateCategoryRequest;
import com.nlu.WebThuongMai.dto.response.productResp.CategoryResponse;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.mapper.CategoryMapper;
import com.nlu.WebThuongMai.model.Category;
import com.nlu.WebThuongMai.repository.CategoryRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
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


    public CategoryResponse getCategoryById(long id) {
        return categoryMapper.toCategoryResponse(categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND)));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<CategoryResponse> filterCategories(CategoriesAdminFilterRequest request, Pageable pageable) {
        Specification<Category> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasText(request.getName())) {
                predicates.add(cb.like(cb.lower(root.get("name")), "%" + request.getName().toLowerCase() + "%"));
            }

            if (StringUtils.hasText(request.getDescription())) {
                predicates.add(cb.like(cb.lower(root.get("description")), "%" + request.getDescription().toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return categoryRepository.findAll(spec, pageable)
                .map(categoryMapper::toCategoryResponse);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public CategoryResponse createNewCategory(CreateCategoryRequest request) {
        if (categoryRepository.existsByNameIgnoreCase(request.getName())) {
            throw new IllegalArgumentException("Tên danh mục đã tồn tại");
        }

        Category newCategory = Category.builder()
                .name(request.getName())
                .imageUrl(request.getImageUrl())
                .description(request.getDescription())
                .build();

        Category saved = categoryRepository.save(newCategory);
        return categoryMapper.toCategoryResponse(saved);
    }

}
