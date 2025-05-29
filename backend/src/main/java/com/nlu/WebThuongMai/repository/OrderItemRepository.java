package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.OrderItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {
    Page<OrderItem> findByOrderId(Long orderId, Pageable pageable);
}
