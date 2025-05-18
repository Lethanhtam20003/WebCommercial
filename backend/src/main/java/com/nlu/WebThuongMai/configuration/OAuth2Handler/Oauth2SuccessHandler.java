package com.nlu.WebThuongMai.configuration.OAuth2Handler;

import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.model.User;
import com.nlu.WebThuongMai.repository.UserRepository;
import com.nlu.WebThuongMai.service.AuthenticationService;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Component
public class Oauth2SuccessHandler implements AuthenticationSuccessHandler {
    AuthenticationService authenticationService;
    UserRepository userRepository;

    @NonFinal
    @Value("${app.frontend.url}")
    String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
       try {
           log.info("Đăng nhập thành công với OAuth2");
           OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

           OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
           String registrationId = oauthToken.getAuthorizedClientRegistrationId(); // "google" hoặc "facebook"
           String id = null;
           if ("google".equals(registrationId)) {
               id = oAuth2User.getAttribute("sub");
           } else if ("facebook".equals(registrationId)) {
               id = oAuth2User.getAttribute("id");
           }

           User user = userRepository.findUserByAuthProviderId(id);
           if (user == null) {
               throw new AppException(ErrorCode.USER_NOT_EXISTED);
           }
           var token = authenticationService.generateToken(user);

           String html = """
                   <html><body>
                   <script>
                     window.opener.postMessage({ token: '%s' }, '%s');
                     window.close();
                   </script>
                   Đăng nhập thành công! Bạn có thể đóng cửa sổ này.
                   </body></html>
                   """.formatted(token, frontendUrl);
           response.setContentType("text/html");
           response.setCharacterEncoding("utf-8");
           response.getWriter().write(html);
       } catch (AppException ex) {
               // Trả lỗi HTML đẹp hoặc JSON tùy ý
               response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
               response.setContentType("text/html");
               response.setCharacterEncoding("utf-8");
               response.getWriter().write("""
            <html><body>
            <h3>Đăng nhập thất bại: %s</h3>
            <p>Vui lòng thử lại.</p>
            </body></html>
        """.formatted(ex.getErrorCode().getMessage())); // hoặc dùng ex.getMessage()
       }
    }
}
