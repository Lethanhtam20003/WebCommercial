package com.nlu.WebThuongMai.configuration.OAuth2Handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Component
/**
 * Xử lý các lỗi xác thực khi người dùng đăng nhập không thành công
 * Implements AuthenticationFailureHandler để xử lý các lỗi xác thực
 */
public class AuthenticationFailHandler implements AuthenticationFailureHandler {
    final ObjectMapper objectMapper;

    @Value("${app.frontend.url}")
    String frontendUrl;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        try {
            String message = exception.getMessage();
            log.info("Authentication failed: {}", message);
            if (exception instanceof OAuth2AuthenticationException oauthEx) {
                message = oauthEx.getError().getDescription(); // ví dụ lấy từ OAuth2Error
                log.info("Authentication failed: {}", message);
            }
            ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
            if (message.equals("user not existed")) {
                errorCode = ErrorCode.USER_NOT_EXISTED;
            }
            // Nếu đang đăng nhập qua popup → gửi thông báo về parent window
            response.setContentType("text/html;charset=UTF-8");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

            ApiResponse<?> apiResponse = ApiResponse.builder()
                    .code(errorCode.getHttpStatusCode().value())
                    .message(errorCode.getMessage())
                    .build();
            log.info("Response: {}", apiResponse);
            String apiResponseJson = objectMapper.writeValueAsString(apiResponse);

            String html = """
                       <html><body>
                       <script>
                        const error = %s;
                        window.opener?.postMessage({ error }, '%s');
                        window.close();
                       </script>
                       </body></html>
                    """.formatted(apiResponseJson, frontendUrl);
            response.getWriter().write(html);
        } catch (IOException e) {
            log.error("Lỗi khi ghi response: {}", e.getMessage());
            throw e;
        }
    }
}
