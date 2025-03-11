package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken, String> {
}
