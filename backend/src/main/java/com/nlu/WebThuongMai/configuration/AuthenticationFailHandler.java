package com.nlu.WebThuongMai.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
@Slf4j
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Component
/**
 * Xử lý các lỗi xác thực khi người dùng đăng nhập không thành công
 * Implements AuthenticationFailureHandler để xử lý các lỗi xác thực
 */
public class AuthenticationFailHandler implements AuthenticationFailureHandler {
   ObjectMapper objectMapper;
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        try {
            log.info("Authentication failed: {}", exception.getMessage());
            final ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
            log.error("Unauthorized error: {}", exception.getMessage());

            response.setStatus(errorCode.getHttpStatusCode().value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

            final ApiResponse<?> apiResponse = ApiResponse.builder()
                    .code(errorCode.getHttpStatusCode().value())
                    .message(errorCode.getMessage())
                    .build();

            objectMapper.writeValue(response.getWriter(), apiResponse);
        } catch (IOException e) {
            log.error("Lỗi khi ghi response: {}", e.getMessage());
            throw e;
        }
    }
}
