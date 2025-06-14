package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.Coupon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Long> {

    Optional<Coupon> findByCode(String code);

    /**
     * Trả về danh sách coupon theo userId với phân trang.
     *
     * @param userId   ID của người dùng.
     * @param pageable thông tin phân trang.
     * @return danh sách các coupon thuộc về user.
     */
    Page<Coupon> findAllByUserId(Long userId, Pageable pageable);
}
