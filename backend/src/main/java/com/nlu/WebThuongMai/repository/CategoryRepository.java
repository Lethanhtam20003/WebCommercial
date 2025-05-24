package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.Category;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);

    @Override
    @NotNull
    List<Category> findAll();
}
