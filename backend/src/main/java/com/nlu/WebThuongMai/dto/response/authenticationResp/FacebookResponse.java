package com.nlu.WebThuongMai.dto.response.authenticationResp;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class FacebookResponse {
    String id;
}
