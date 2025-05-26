package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.productReq.PurchaseOrderCreatetionRequest;
import com.nlu.WebThuongMai.dto.request.productReq.PurchaseOrderUpdateRequest;
import com.nlu.WebThuongMai.dto.response.productResp.PurchaseOrderResponse;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.mapper.PurchaseOrderItemMapper;
import com.nlu.WebThuongMai.mapper.PurchaseOrderMapper;
import com.nlu.WebThuongMai.model.PurchaseOrder;
import com.nlu.WebThuongMai.model.PurchaseOrderItem;
import com.nlu.WebThuongMai.repository.PurchaseOrderRepository;
import lombok.RequiredArgsConstructor;
import org.apache.el.stream.Stream;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
               .map(item ->{
                   // kiểm tra sản phẩm
                   var product = productService.findProductById(item.getProduct().getId());
                   inventoryService.updateInventory(product, item.getQuantity());
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
        var supplier = supplierService.findSupplierById(request.getSupplierId());

        order.setSupplier(supplier);
        order.setTotalPrice(request.getTotalPrice());
        order.setStatus(request.getStatus());
        order.setCreatedAt(request.getCreatedAt());
        order.setPurchaseOrderItems(itemMapper.toSetPurchaseOrderItem(request.getItems()));
        //tru so luong san pham cua order hien tai
        order.getPurchaseOrderItems()
                .forEach(item ->{
                    if(inventoryService.checkInventory(item.getProduct().getId(), item.getQuantity()))
                        inventoryService.updateInventory(item.getProduct(), -item.getQuantity());
                });
        // thay doi cac san phâm
        var listOrderItem = request.getItems().stream()
                .map(item -> {
                    var product = productService.findProductById(item.getProductId());
                    inventoryService.updateInventory(product, item.getQuantity());
                    return PurchaseOrderItem.builder()
                            .product(product)
                            .quantity(item.getQuantity())
                            .unitPrice(item.getUnitPrice())
                            .purchaseOrder(order)
                            .build();
                }).collect(Collectors.toSet());
        order.setPurchaseOrderItems(listOrderItem);


        return mapper.toPurchaseOrderResponse(repository.save(order));
    }
}
