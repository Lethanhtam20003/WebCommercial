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
public class UserFilterAdminRequest extends PaginationRequest {
    @Size(min = 3, max = 50, message = "Username phải từ 3 đến 50 ký tự")
    String username;
    @Email(message = "Email không hợp lệ")
    String email;
    @Pattern(regexp = "^(\\+84|0)[1-9][0-9]{8,9}$", message = "Số điện thoại không hợp lệ")
    String phone;
    @Pattern(regexp = "ACTIVE|INACTIVE|BANNED", message = "Status không hợp lệ")
    String status;
    @Pattern(regexp = "GOOGLE|FACEBOOK|LOCAL", message = "Auth provider không hợp lệ")
    String authProvider;
    @PastOrPresent(message = "Ngày tạo không được ở tương lai")
    LocalDate createdAt;
}
