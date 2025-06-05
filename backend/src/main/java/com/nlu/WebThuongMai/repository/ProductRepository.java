package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.Product;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT DISTINCT p FROM Product p" +
            " JOIN p.categories c" +
            " JOIN p.images i" +
            " WHERE c.name = :name")
    Page<Product> findByCategoryName(@Param("name") String name, Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"images", "categories"})
    Page<Product> findAll(@NotNull Pageable pageable);


    Boolean existsByName(String name);


    @EntityGraph(attributePaths = {
            "statistic",
            "categories",
            "images",
            "promotions"
    })
    Page<Product> findAll(Specification<Product> spec, Pageable pageable);
}
