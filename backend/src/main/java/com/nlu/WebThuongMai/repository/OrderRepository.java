package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}