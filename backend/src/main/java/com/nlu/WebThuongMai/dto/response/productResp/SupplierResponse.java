package com.nlu.WebThuongMai.dto.response.productResp;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SupplierResponse {
    String id;
    String name;
    String address;
    String phone;
    String email;
    String website;
    String logo;
    String description;
}
