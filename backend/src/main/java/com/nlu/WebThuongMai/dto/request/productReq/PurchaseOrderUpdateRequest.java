package com.nlu.WebThuongMai.dto.request.productReq;

import com.nlu.WebThuongMai.enums.PurchaseStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;


@Data
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PurchaseOrderUpdateRequest {
    @NotNull
    PurchaseStatus status;

}
