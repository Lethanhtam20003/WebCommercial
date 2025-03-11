package com.nlu.WebThuongMai.configuration;

import com.nimbusds.jose.JOSEException;
import com.nlu.WebThuongMai.dto.request.IntrospectRequest;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.text.ParseException;
import java.util.Objects;

@RequiredArgsConstructor

@Component
public class CustomJwtDecoder implements JwtDecoder {
    @Value("${jwt.key}")
    private String key;

    private NimbusJwtDecoder jwtDecoder = null;
    @Autowired
    private AuthenticationService  authenticationService;

    @Override
    public Jwt decode(String token) throws JwtException {
        try {
            var response = authenticationService.introspect(IntrospectRequest.builder().token(token).build());
            if(!response.isValid())
               throw new AppException(ErrorCode.UNAUTHORIZED);
        } catch (JOSEException | ParseException e) {
            throw new RuntimeException(e);
        }
        if(Objects.isNull(jwtDecoder)){
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "HS512");
            jwtDecoder =  NimbusJwtDecoder
                    .withSecretKey(secretKey)
                    .macAlgorithm(MacAlgorithm.HS512)
                    .build();
        }

        return jwtDecoder.decode(token);
    }
}
