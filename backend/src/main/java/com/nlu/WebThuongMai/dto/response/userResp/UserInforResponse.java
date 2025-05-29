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
public class UserInforResponse {
    long id;
    String username;
    String fullName;
    String avatar;
    LocalDate birthday;
    String gender;
    String email;
    String phone;
    String address;
    Role role;
    String status;
    String authProvider;
    LocalDateTime created_at;
    LocalDateTime updated_at;
}
