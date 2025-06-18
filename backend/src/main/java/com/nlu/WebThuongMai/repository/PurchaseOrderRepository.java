package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.PurchaseOrder;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    @EntityGraph(attributePaths = {"purchaseOrderItems", "supplier"})
    Optional<PurchaseOrder> findById(long orderId);

}
