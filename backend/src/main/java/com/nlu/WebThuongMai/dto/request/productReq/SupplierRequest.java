package com.nlu.WebThuongMai.dto.request.productReq;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SupplierRequest {
    @NotNull
    @NotBlank
    String name;
    @NotNull
    @NotBlank
    String address;
    @NotNull
    @NotBlank
    String phone;
    @NotNull
    @NotBlank
    String email;

    String website;
    String logo;
    String description;
}
