package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.model.Inventory;
import com.nlu.WebThuongMai.model.Product;
import com.nlu.WebThuongMai.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
class InventoryService {
    private final InventoryRepository repository;

    public void updateInventory(Product product, Integer quantity) {
        Inventory inventory = repository.getInventoryByProductId(product.getId());

        if(inventory != null){
            if(inventory.getQuantity() + quantity < 0)
                throw new AppException(ErrorCode.PRODUCT_NOT_ENOUGH_IN_STOCK);
            inventory.setQuantity(inventory.getQuantity()+ quantity);
            repository.save(inventory);
        }
        else if(quantity > 0)
            repository.save(Inventory.builder().product(product).quantity(quantity).build());
        else
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND_IN_STOCK);
    }

    public boolean checkInventory(long productId, int quantity) {
        Inventory inventory = repository.getInventoryByProductId(productId);
        if(inventory != null){
             if(inventory.getQuantity() >= quantity)
                 return true;
             throw new AppException(ErrorCode.QUALITY_PRODUCT_NOT_ENOUGH);
        }
        return false;
    }
}
