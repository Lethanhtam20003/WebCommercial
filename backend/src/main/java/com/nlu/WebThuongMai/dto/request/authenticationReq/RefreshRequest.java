package com.nlu.WebThuongMai.dto.request.authenticationReq;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RefreshRequest {
    String token;
}
