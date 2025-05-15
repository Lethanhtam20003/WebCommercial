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
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Component
/**
 * Xử lý các lỗi truy cập không hợp lệ
 * Implements AccessDeniedHandler để xử lý các lỗi truy cập không hợp lệ
 */
public class JwtAccessDeniceHandle implements AccessDeniedHandler {
    private final ObjectMapper objectMapper;

    public JwtAccessDeniceHandle() {
        this.objectMapper = new ObjectMapper();
    }
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        try {
            final ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
            log.error("Unauthorized error: {}", accessDeniedException.getMessage());

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
