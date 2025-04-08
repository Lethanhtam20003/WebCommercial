package com.nlu.WebThuongMai.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
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
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

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
        String token = authenticationService.generateToken(user);

        String script = """
                    <script>
                        window.opener.postMessage(%s, '%s');
                        window.close();
                    </script>
                """.formatted(
                new ObjectMapper().writeValueAsString(
                        ApiResponse.builder()
                                .message("Login success!")
                                .result(Map.of(
                                        "token", token
                                ))
                                .build()
                ),
                frontendUrl
        );

        response.setContentType("text/html");
        response.getWriter().write(script);
//        response.sendRedirect(frontendUrl+"/oauth2-redirect?data=" + encoded);
    }
}
