package com.nlu.WebThuongMai.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Entry point xử lý các request chưa được xác thực
 * Implements AuthenticationEntryPoint để xử lý các exception liên quan đến authentication
 */
@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    public JwtAuthenticationEntryPoint() {
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Xử lý các request chưa được xác thực và trả về response phù hợp
     *
     * @param request       HTTP request chưa được xác thực
     * @param response      HTTP response
     * @param authException Exception chứa thông tin về lỗi xác thực
     * @throws IOException nếu có lỗi khi ghi response
     */
    @Override
    public void commence(final HttpServletRequest request,
                        final HttpServletResponse response,
                        final AuthenticationException authException) throws IOException {
        try {
            final ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
            log.debug("Unauthorized error: {}", authException.getMessage());

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
