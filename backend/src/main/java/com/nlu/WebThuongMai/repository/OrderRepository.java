package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.enums.OrderStatus;
import com.nlu.WebThuongMai.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findOrdersByStatus(OrderStatus status);
    List<Order> findOrdersByUserId(Long userId);
    List<Order> findOrdersByUserIdAndStatus(Long userId, OrderStatus status);
    List<Order> findAll();
}
