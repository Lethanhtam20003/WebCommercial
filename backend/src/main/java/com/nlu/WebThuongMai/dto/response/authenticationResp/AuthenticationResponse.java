package com.nlu.WebThuongMai.dto.response.authenticationResp;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    String token;
}
