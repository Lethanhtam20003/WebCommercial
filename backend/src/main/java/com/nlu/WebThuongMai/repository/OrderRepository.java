package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.enums.OrderStatus;
import com.nlu.WebThuongMai.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(OrderStatus status);
}
