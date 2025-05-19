package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p JOIN p.categories c WHERE c.name = :name")
    Page<Product> findByCategoryName(@Param("name") String name, Pageable pageable);


}
