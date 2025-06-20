package com.nlu.WebThuongMai.dto.request.userReq;

import com.nlu.WebThuongMai.dto.request.PageRequest.PaginationRequest;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@EqualsAndHashCode(callSuper = true)

public class UserFilterAdminRequest extends PaginationRequest {
    String username;
    String email;
    String phone;
    String status;
    String authProvider;
    LocalDate createdAt;
}
