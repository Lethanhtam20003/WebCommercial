package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.Inventory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    @EntityGraph(attributePaths = {"product"})
    Page<Inventory> findAll(Specification<Inventory> spec, Pageable pageable);

    Inventory getInventoryById(Long id);

    Inventory getInventoryByProductId(Long productId);
}