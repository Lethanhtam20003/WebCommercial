package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.response.productResp.InventoryResponse;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.mapper.InventoryMapper;
import com.nlu.WebThuongMai.model.Inventory;
import com.nlu.WebThuongMai.model.Product;
import com.nlu.WebThuongMai.repository.InventoryRepository;
import com.nlu.WebThuongMai.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Service
public class InventoryService {
    private final InventoryRepository repository;
    private final InventoryMapper mapper;
    private final ProductRepository productRepository;


    /**
     * Nhập kho hoặc cập nhật tồn kho cho sản phẩm
     * @param productId ID sản phẩm
     * @param quantity Số lượng nhập (phải > 0)
     */
    @Transactional
    public void importInventory(Long productId, int quantity) {
        if (quantity <= 0) {
            throw new AppException(ErrorCode.INVALID_QUANTITY);
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        Inventory inventory = repository.getInventoryByProductId(product.getId());

        if (inventory == null) {
            inventory = Inventory.builder()
                    .product(product)
                    .quantity(quantity)
                    .build();
        } else {
            inventory.setQuantity(inventory.getQuantity() + quantity);
        }

        repository.save(inventory);
    }

    /**
     * Xuất kho sản phẩm (giảm số lượng)
     *
     * @param productId ID sản phẩm
     * @param quantity  Số lượng xuất (phải > 0)
     */
    @Transactional
    public void exportInventory(Long productId, int quantity) {

        Inventory inventory = repository.getInventoryByProductId(productId);
        if (inventory == null) {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND_IN_STOCK);
        }

        if (inventory.getQuantity() < quantity) {
            throw new AppException(ErrorCode.PRODUCT_NOT_ENOUGH_IN_STOCK);
        }

        inventory.setQuantity(inventory.getQuantity() - quantity);
        repository.save(inventory);
    }

    /**
     * Kiểm tra tồn kho đủ hay không
     */
    public boolean hasEnoughStock(long productId, int quantity) {
        Inventory inventory = repository.getInventoryByProductId(productId);
        return inventory != null && inventory.getQuantity() >= quantity;
    }

    /**
     * Lấy thông tin tồn kho hiện tại
     */
    public Inventory getInventory(long productId) {
        Inventory inventory = repository.getInventoryByProductId(productId);
        if (inventory == null) {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND_IN_STOCK);
        }
        return inventory;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @Transactional
    public Page<InventoryResponse> getAllInventory(Pageable pageable) {
        Specification<Inventory> specification = Specification.where(null);
        return mapper.toPageInventory(repository.findAll(specification,pageable));
    }
}
