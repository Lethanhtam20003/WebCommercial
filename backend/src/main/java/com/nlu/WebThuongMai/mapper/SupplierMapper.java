package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.request.productReq.SupplierRequest;
import com.nlu.WebThuongMai.dto.response.productResp.SupplierResponse;
import com.nlu.WebThuongMai.model.Supplier;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SupplierMapper {

    Supplier toSupplier(SupplierRequest request);

    @Mapping(target = "id", source = "supplierId")
    Supplier toSupplier(long supplierId, SupplierRequest data);

    SupplierResponse toSupplierResponse(Supplier data);

    default Page<SupplierResponse> toPageSupplierResponse(Page<Supplier> all) {
        return all.map(this::toSupplierResponse);
    }
}
