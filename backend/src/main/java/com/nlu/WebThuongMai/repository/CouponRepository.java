package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {
}
