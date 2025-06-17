package com.nlu.WebThuongMai.dto.request.userReq;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserFilterAdminRequest {
    String username;
    String email;
    String phone;
    String status;
    String authProvider;
    LocalDate createdAt;
}
