package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {


  Inventory getInventoryById(Long id);

  Inventory getInventoryByProductId(Long productId);
}