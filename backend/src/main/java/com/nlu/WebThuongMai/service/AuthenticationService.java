package com.nlu.WebThuongMai.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.nlu.WebThuongMai.dto.request.authenticationReq.*;
import com.nlu.WebThuongMai.dto.response.authenticationResp.AuthenticationResponse;
import com.nlu.WebThuongMai.dto.response.authenticationResp.IntrospectResponse;
import com.nlu.WebThuongMai.enums.AuthProvider;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.model.InvalidatedToken;
import com.nlu.WebThuongMai.model.User;
import com.nlu.WebThuongMai.repository.InvalidatedTokenRepository;
import com.nlu.WebThuongMai.repository.UserRepository;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

/**
 * Service xử lý các chức năng liên quan đến xác thực người dùng
 * Bao gồm đăng nhập, đăng xuất, kiểm tra token, làm mới token
 * Sử dụng JWT (JSON Web Token) để xác thực
 */
@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;
    InvalidatedTokenRepository invalidatedTokenRepository;

    @NonFinal
    @Value("${jwt.key}")
    String TOKEN_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    long REFRESHABLE_DURATION;

    /**
     * Đăng ký tài khoản mới
     * Mã hóa mật khẩu và lưu thông tin người dùng vào cơ sở dữ liệu
     *
     * @param request Thông tin người dùng mới
     * @throws AppException nếu tên đăng nhập đã tồn tại
     */
    public void register(@NotNull RegisterRequest request) {
        if ( userRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USER_EXISTED);
        if(request.getEmail() != null && !request.getEmail().isEmpty())
            if ( userRepository.existsByEmail(request.getEmail()) && !request.getEmail().isEmpty())
                throw new AppException(ErrorCode.EMAIL_EXISTED);
        if (request.getPhone() != null && !request.getPhone().isEmpty())
            if ( userRepository.existsByPhone(request.getPhone()))
                throw new AppException(ErrorCode.PHONE_EXISTED);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail() == null ? null : request.getEmail())
                .phone(request.getPhone() == null? null : request.getPhone())
                .authProvider(AuthProvider.LOCAL)
                .build();
        userRepository.save(user);
        log.info("Register user successfully");
    }
    /**
     * Xác thực người dùng và tạo token JWT
     * 
     * @param request Chứa thông tin đăng nhập (username, password)
     * @return AuthenticationResponse chứa token JWT nếu xác thực thành công
     * @throws AppException nếu thông tin đăng nhập không hợp lệ
     */
    public AuthenticationResponse login(@NotNull AuthenticationRequest request) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!authenticated)
            throw new AppException(ErrorCode.PASSWORD_NOT_CORRECT);
        var token = generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    /**
     * Đăng xuất người dùng bằng cách vô hiệu hóa token
     * Token bị vô hiệu hóa sẽ được lưu vào bảng invalidatedToken
     * 
     * @param request Chứa token cần vô hiệu hóa
     * @throws ParseException nếu không thể parse token
     * @throws JOSEException nếu có lỗi xử lý JWT
     */
    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {
            var signToken = verifyToken(request.getToken(), true);

            String jwtId = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();
            InvalidatedToken invalidatedToken = new InvalidatedToken(jwtId, expiryTime);

            invalidatedTokenRepository.save(invalidatedToken);
            log.info("Logout successful");
        } catch (AppException exception) {
            log.info("Token already expired");
        }
    }

    /**
     * Kiểm tra tính hợp lệ của token
     * 
     * @param request Chứa token cần kiểm tra
     * @return IntrospectResponse cho biết token có hợp lệ hay không
     * @throws JOSEException nếu có lỗi xử lý JWT
     * @throws ParseException nếu không thể parse token
     */
    public IntrospectResponse introspect(@NotNull IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;
        try {
            verifyToken(token, false);
        } catch (AppException e) {
            isValid = false;
        }
        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }

    /**
     * Tạo token JWT mới cho người dùng
     * Token chứa thông tin username, role và thời gian hết hạn
     * Sử dụng thuật toán HS512 để ký token
     * 
     * @param user Thông tin người dùng để tạo token
     * @return Token JWT dạng chuỗi
     */
    public String generateToken(@NotNull User user) {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("WebCommercial")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli())) // het han sau 1 h
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", user.getRole())
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(jwsHeader, payload);
        try {
            jwsObject.sign(new MACSigner(TOKEN_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("can not create JWSObject", e);
            throw new RuntimeException(e);
        }
    }

    /**
     * Xác thực và kiểm tra tính hợp lệ của token
     * 
     * @param token Token cần xác thực
     * @param isRefresh True nếu đang kiểm tra để refresh token
     * @return SignedJWT đã được xác thực
     * @throws JOSEException nếu có lỗi xử lý JWT
     * @throws ParseException nếu không thể parse token
     * @throws AppException nếu token không hợp lệ hoặc đã hết hạn
     */
    public SignedJWT verifyToken(String token, boolean isRefresh) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(TOKEN_KEY);
        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expiryTime = (isRefresh)
                ? new Date(signedJWT.getJWTClaimsSet().getIssueTime().toInstant().plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();
        var verifiedJWT = signedJWT.verify(verifier);
        if (!(verifiedJWT && expiryTime.after(new Date())))
            throw new AppException(ErrorCode.TOKEN_EXPIRED);
        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHORIZED);
        return signedJWT;
    }

    /**
     * Làm mới token JWT
     * Vô hiệu hóa token cũ và tạo token mới
     * 
     * @param request Chứa token cần làm mới
     * @return AuthenticationResponse chứa token mới
     * @throws JOSEException nếu có lỗi xử lý JWT
     * @throws ParseException nếu không thể parse token
     */
    public AuthenticationResponse refreshToken(@NotNull RefreshRequest request) throws JOSEException, ParseException {
        var signedJWT = verifyToken(request.getToken(), true);
        // cancel current token
        var jwtId = signedJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                .id(jwtId)
                .expiryTime(expiryTime)
                .build();
        invalidatedTokenRepository.save(invalidatedToken);
        // generate new token
        var username = signedJWT.getJWTClaimsSet().getSubject();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        var token = generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }
}
