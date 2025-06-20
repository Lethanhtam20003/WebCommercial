package com.nlu.WebThuongMai.dto.request.userReq;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserChangePasswordRequest {
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    String email;
    @NotBlank(message = "Mật khẩu cũ không được để trống")
    @Size(min = 6, max = 100, message = "Mật khẩu cũ phải có ít nhất 6 ký tự")
    String oldPassword;
    @NotBlank(message = "Mật khẩu mới không được để trống")
    @Size(min = 6, max = 100, message = "Mật khẩu mới phải có ít nhất 6 ký tự")
    String newPassword;
}
