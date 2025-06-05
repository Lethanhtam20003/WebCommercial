package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.enums.OrderStatus;
import com.nlu.WebThuongMai.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findOrdersByStatus(OrderStatus status);
    Page<Order> findOrdersByUserId(Long userId, Pageable pageable);
    Page<Order> findOrdersByUserIdAndStatus(Long userId, OrderStatus status, Pageable pageable);
    List<Order> findAll();
    Page<Order> findAll(Specification<Order> spec, Pageable pageable);
}
