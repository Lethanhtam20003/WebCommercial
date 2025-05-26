package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.request.productReq.PurchaseOrderItemRequest;
import com.nlu.WebThuongMai.dto.response.productResp.PurchaseOrderItemResponse;
import com.nlu.WebThuongMai.model.Product;
import com.nlu.WebThuongMai.model.PurchaseOrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.lang.annotation.Target;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {ProductMapper.class})
public interface PurchaseOrderItemMapper {

    @Mapping(target = "product" , source = "productId", qualifiedByName = "mapToProduct")
    PurchaseOrderItem toPurchaseOrderItem(PurchaseOrderItemRequest itemRequest);

    PurchaseOrderItemResponse toPurchaseOrderItemResponse(PurchaseOrderItem purchaseOrderItem);


    default Set<PurchaseOrderItem> toSetPurchaseOrderItem(Set<PurchaseOrderItemRequest> items){
        return items.stream().map(this::toPurchaseOrderItem).collect(Collectors.toSet());
    }
    @Named("mapToProduct")
    default Product mapToProduct(Long productId) {
        if (productId == null) return null;
        Product product = new Product();
        product.setId(productId);
        return product;
    }
}
