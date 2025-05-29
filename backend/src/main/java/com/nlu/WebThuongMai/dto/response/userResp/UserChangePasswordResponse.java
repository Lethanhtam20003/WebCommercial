package com.nlu.WebThuongMai.dto.response.userResp;

import com.nlu.WebThuongMai.enums.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserChangePasswordResponse {
    long id;
    String email;
    String password;
}
