package com.nlu.WebThuongMai.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    String password;
    String firstName;
    String lastName;
    LocalDate birthday;
    String avatar;
    String gender;
    String email;
    String phone;
    String address;
    String status;
}
