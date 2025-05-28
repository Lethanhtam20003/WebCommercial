package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.productReq.PurchaseOrderCreatetionRequest;
import com.nlu.WebThuongMai.dto.request.productReq.PurchaseOrderUpdateRequest;
import com.nlu.WebThuongMai.dto.response.productResp.PurchaseOrderResponse;
import com.nlu.WebThuongMai.enums.PurchaseStatus;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.mapper.PurchaseOrderItemMapper;
import com.nlu.WebThuongMai.mapper.PurchaseOrderMapper;
import com.nlu.WebThuongMai.model.PurchaseOrder;
import com.nlu.WebThuongMai.model.PurchaseOrderItem;
import com.nlu.WebThuongMai.repository.PurchaseOrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class PurchaseOrderService {
    private final PurchaseOrderRepository repository;
    private final PurchaseOrderMapper mapper;
    private final PurchaseOrderItemMapper itemMapper;

    private final ProductService productService;
    private final SupplierService supplierService;
    private final InventoryService inventoryService;


    @Transactional
    public PurchaseOrderResponse createPurchaseOrder(long supplierId, PurchaseOrderCreatetionRequest request) {
        // kiểm tra nhà cung cấp
        var supplier = supplierService.findSupplierById(supplierId);
        // tạo đơn hàng
        var order = PurchaseOrder.builder()
                .supplier(supplier)
                .createdAt(request.getCreatedAt())
                .totalPrice(request.getTotalPrice())
                .status(request.getStatus())
                .build();
        var items = itemMapper.toSetPurchaseOrderItem(request.getItems()).stream()
                .map(item -> {
                    // kiểm tra sản phẩm
                    var product = productService.findProductById(item.getProduct().getId());
                    return PurchaseOrderItem.builder()
                            .product(product)
                            .quantity(item.getQuantity())
                            .unitPrice(item.getUnitPrice())
                            .purchaseOrder(order)
                            .build();
                }).collect(Collectors.toSet());
        order.setPurchaseOrderItems(items);

        return mapper.toPurchaseOrderResponse(repository.save(order));
    }

    public List<PurchaseOrderResponse> getAllPurchaseOrder() {
        return repository.findAll().stream()
                .map(mapper::toPurchaseOrderResponse)
                .collect(Collectors.toList());
    }

    public PurchaseOrderResponse getPurchaseOrderById(long orderId) {
        return mapper.toPurchaseOrderResponse(repository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.PURCHASE_ORDER_NOT_FOUND)));
    }

    public Boolean deletePurchaseOrder(long orderId) {
        try {
            var order = repository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.PURCHASE_ORDER_NOT_FOUND));
            if (order.getStatus() == PurchaseStatus.RECEIVED)
                order.getPurchaseOrderItems().forEach(item -> {
                    inventoryService.updateInventory(item.getProduct(), -item.getQuantity());
                });
            repository.deleteById(orderId);
            return true;
        } catch (Exception e) {
            throw new AppException(ErrorCode.PURCHASE_ORDER_NOT_FOUND);
        }
    }

    @Transactional
    public PurchaseOrderResponse updatePurchaseOrder(long orderId, PurchaseOrderUpdateRequest request) {

        var order = repository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.PURCHASE_ORDER_NOT_FOUND));
        log.info("Update purchase order: {}", request);
        // xác nhận nhập hàng
        if (order.getStatus() == PurchaseStatus.PENDING && request.getStatus() == PurchaseStatus.RECEIVED) {
            order.getPurchaseOrderItems().forEach(item -> {
                inventoryService.updateInventory(item.getProduct(), item.getQuantity());
            });
        }
        // hũy nhập hàng khi sau khi xác nhận nhập hàng
        if (order.getStatus() == PurchaseStatus.RECEIVED && request.getStatus() == PurchaseStatus.CANCELLED) {
            order.getPurchaseOrderItems().forEach(item -> {
                inventoryService.updateInventory(item.getProduct(), -item.getQuantity());
            });
        }
        // hũy nhập hàng khi chưa xác nhận nhập hàng
        order.setStatus(request.getStatus());
        return mapper.toPurchaseOrderResponse(repository.save(order));
    }
}
