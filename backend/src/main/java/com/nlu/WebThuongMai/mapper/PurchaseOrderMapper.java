package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.response.productResp.PurchaseOrderResponse;
import com.nlu.WebThuongMai.model.PurchaseOrder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",  unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = {
            ProductMapper.class,
            PurchaseOrderItemMapper.class
        }
)
public interface PurchaseOrderMapper {

    @Mapping(target = "items", source = "purchaseOrderItems")
    PurchaseOrderResponse toPurchaseOrderResponse(PurchaseOrder order);
    
    PurchaseOrder toPurchaseOrder(PurchaseOrderResponse order);

}
