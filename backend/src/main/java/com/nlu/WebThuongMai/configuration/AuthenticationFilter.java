package com.nlu.WebThuongMai.configuration;

import com.nimbusds.jwt.SignedJWT;
import com.nlu.WebThuongMai.enums.AuthProvider;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.repository.UserRepository;
import com.nlu.WebThuongMai.service.AuthenticationService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filter để xác thực JWT token trong request
 * Extends OncePerRequestFilter để đảm bảo filter chỉ được thực thi một lần cho mỗi request
 */
@Slf4j
@Component
public class AuthenticationFilter extends OncePerRequestFilter {

    private static final String BEARER_PREFIX = "Bearer ";
    private static final String AUTHORIZATION_HEADER = "Authorization";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @Override
    protected void doFilterInternal(final HttpServletRequest request,
                                    final HttpServletResponse response,
                                    final FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = extractToken(request);
            if (token != null) {
                processToken(token);
            }
        } catch (Exception e) {
            log.error("Lỗi xử lý JWT token: {}", e.getMessage());
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Trích xuất JWT token từ request
     *
     * @param request HTTP request
     * @return JWT token hoặc null nếu không tìm thấy
     */
    private String extractToken(final HttpServletRequest request) {
        String authHeader = request.getHeader(AUTHORIZATION_HEADER);
        if (authHeader != null && authHeader.startsWith(BEARER_PREFIX)) {
            return authHeader.substring(BEARER_PREFIX.length());
        }
        return null;
    }

    /**
     * Xử lý JWT token và set authentication nếu token hợp lệ
     *
     * @param token JWT token cần xử lý
     * @throws com.nimbusds.jose.JOSEException nếu có lỗi khi xử lý JWT
     * @throws java.text.ParseException        nếu có lỗi khi parse JWT
     */
    private void processToken(final String token) throws com.nimbusds.jose.JOSEException, java.text.ParseException {
        try {
            SignedJWT signedJWT = authenticationService.verifyToken(token, false);
            String username = signedJWT.getJWTClaimsSet().getSubject();

            var user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
            String password = user.getPassword();
            if (password == null && user.getAuthProvider() != AuthProvider.LOCAL) {
                password = ""; // hoặc UUID.randomUUID().toString()
            }

            UserDetails userDetails = org.springframework.security.core.userdetails.User
                    .withUsername(user.getUsername())
                    .password(password)
                    .authorities(String.valueOf(user.getRole()))
                    .build();

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(auth);
            log.debug("Xác thực thành công cho user: {}", username);
        } catch (Exception e) {
            log.warn("Token không hợp lệ: {}", e.getMessage());
            throw e;
        }
    }
}

