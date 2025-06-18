package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.response.productResp.InventoryResponse;
import com.nlu.WebThuongMai.model.Inventory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring",
uses =  {ProductMapper.class})
public interface InventoryMapper {
    @Mapping(target = "product", source = "inventory.product")
    InventoryResponse toInventoryResponse(Inventory inventory);

    default Page<InventoryResponse> toPageInventory(Page<Inventory> all){
        return all.map(this::toInventoryResponse);
    }
}
