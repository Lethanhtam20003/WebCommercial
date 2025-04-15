package com.nlu.WebThuongMai.configuration;

import com.nlu.WebThuongMai.model.User;
import com.nlu.WebThuongMai.repository.UserRepository;
import com.nlu.WebThuongMai.service.AuthenticationService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

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
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String id = oAuth2User.getAttribute("id");

        User user = userRepository.findUserByAuthProviderId(id);

        var token = authenticationService.generateToken(user);

        // Trả về HTML chứa JS để post token về main window
        String html = """
                <html><body>
                <script>
                  window.opener.postMessage({ token: '%s' }, 'http://localhost:4200');
                  window.close();
                </script>
                Đăng nhập thành công! Bạn có thể đóng cửa sổ này.
                </body></html>
                """.formatted(token);
        response.setContentType("text/html");
        response.setCharacterEncoding("utf-8");
        response.getWriter().write(html);
    }
}
