package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    boolean existsByContactName(String name);
}
