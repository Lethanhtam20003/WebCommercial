package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.repository.InvalidatedTokenRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@Service
public class InvalidatedTokenService {
    InvalidatedTokenRepository invalidatedTokenRepository;

    public void resetInvalidatedToken() {
        invalidatedTokenRepository.deleteAll();
    }
}
