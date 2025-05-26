package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.productReq.PurchaseOrderRequest;
import com.nlu.WebThuongMai.dto.response.productResp.PurchaseOrderResponse;
import com.nlu.WebThuongMai.mapper.PurchaseOrderItemMapper;
import com.nlu.WebThuongMai.mapper.PurchaseOrderMapper;
import com.nlu.WebThuongMai.model.Product;
import com.nlu.WebThuongMai.model.PurchaseOrder;
import com.nlu.WebThuongMai.model.PurchaseOrderItem;
import com.nlu.WebThuongMai.repository.PurchaseOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PurchaseOrderService {
    private final SupplierService supplierService;
    private final PurchaseOrderRepository repository;
    private final PurchaseOrderMapper mapper;
    private final PurchaseOrderItemMapper itemMapper;
    private final ProductService productService;


    @Transactional
    public PurchaseOrderResponse createPurchaseOrder(long supplierId, PurchaseOrderRequest request) {
        var supplier = supplierService.findSupplierById(supplierId);
        var order = PurchaseOrder.builder()
                .supplier(supplier)
                .createdAt(request.getCreatedAt())
                .totalPrice(request.getTotalPrice())
                .status(request.getStatus())
                .build();
       var items = itemMapper.toSetPurchaseOrderItem(request.getItems()).stream()
               .map(item ->{
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
}
