package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.PurchaseOrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurChaseOrderItemRepository extends JpaRepository<PurchaseOrderItem, Long> {
}
