package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.repository.InvalidatedTokenRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

/**
 * Service quản lý các token đã bị vô hiệu hóa.
 * Xử lý việc lưu trữ và xóa các token không còn hiệu lực
 * để ngăn chặn việc sử dụng lại token đã hết hạn hoặc đã bị đăng xuất.
 */
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
public class InvalidatedTokenService {
    InvalidatedTokenRepository invalidatedTokenRepository;

    /**
     * Xóa tất cả các token đã bị vô hiệu hóa khỏi hệ thống.
     * Thường được sử dụng để dọn dẹp các token hết hạn
     * hoặc reset trạng thái của hệ thống.
     */
    public void resetInvalidatedToken() {
        invalidatedTokenRepository.deleteAll();
    }
}
