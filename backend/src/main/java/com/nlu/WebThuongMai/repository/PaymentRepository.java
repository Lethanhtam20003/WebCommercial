package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
