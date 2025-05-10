package com.nlu.WebThuongMai.dto.request.authenticationReq;

import com.nlu.WebThuongMai.validator.phone.PhoneConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {
    @NotBlank(message = "USERNAME_INVALID")
    @Size(min = 3, message = "USERNAME_SIZE_INVALID")
    String username;
    @Size(min = 8, max = 32, message = "PASSWORD_SIZE_INVALID")
    @NotBlank
    String password;
    @Email(message = "EMAIL_EXISTED")
    String email;
    @PhoneConstraint(message = "PHONE_INVALID")
    String phone;


}
