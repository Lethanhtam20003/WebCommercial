package com.nlu.WebThuongMai.dto.request.userReq;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserChangePasswordRequest {
    String email;
    String oldPassword;
    String newPassword;
}
