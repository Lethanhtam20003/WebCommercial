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
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
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
        String userInfo = new ObjectMapper().writeValueAsString(Map.of(
                "username", user.getUsername(),
                "role", user.getRole()
        ));

        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofDays(1))
                .build();
        ResponseCookie userInfoCookie = ResponseCookie.from("userInfo", URLEncoder.encode(userInfo, StandardCharsets.UTF_8))
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofDays(1))
                .build();
        response.setHeader(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, userInfoCookie.toString());

        response.sendRedirect("http://localhost:4200/oauth2-redirect");
    }
}
