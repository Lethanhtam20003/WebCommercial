package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.orderReq.OrderCreateRequest;
import com.nlu.WebThuongMai.dto.request.orderReq.OrderUpdateRequest;
import com.nlu.WebThuongMai.dto.response.OrderResp.OrderResponse;
import com.nlu.WebThuongMai.enums.OrderStatus;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.mapper.OrderMapper;
import com.nlu.WebThuongMai.model.Order;
import com.nlu.WebThuongMai.model.OrderItem;
import com.nlu.WebThuongMai.repository.OrderRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@Service
public class OrderService {
    OrderRepository repository;
    OrderMapper mapper;

    ProductService productService;
    UserService userService;
    InventoryService inventoryService;
    CouponService couponService;

    /**
     * Tạo một đơn hàng mới dựa trên thông tin yêu cầu tạo đơn hàng được cung cấp.
     * Thực hiện xử lý người dùng, áp dụng mã giảm giá (nếu có),
     * cập nhật tồn kho sản phẩm, và tính toán tổng giá trị đơn hàng bao gồm giảm giá nếu áp dụng.
     *
     * @param request thông tin chi tiết của đơn hàng cần tạo, bao gồm ID người dùng,
     *                danh sách sản phẩm đặt hàng, mã giảm giá tùy chọn, ghi chú và ngày tạo
     * @return phản hồi chứa thông tin chi tiết của đơn hàng đã tạo như ID đơn hàng,
     * tổng giá trị, giá sau khi giảm, trạng thái và danh sách sản phẩm trong đơn hàng
     */

    public OrderResponse createOrder(OrderCreateRequest request) {
        var user = userService.findUserById(request.getUserId());
        // tạo đơn hàng
        var order = Order.builder()
                .user(user)
                .status(OrderStatus.PENDING)
                .note(request.getNote())
                .createdDate(request.getCreatedDate())
                .build();
        // tính tổng tiền
        AtomicReference<BigDecimal> totalPrice = new AtomicReference<>(BigDecimal.ZERO);

        // thêm sản phẩm vào đơn hàng
        Set<OrderItem> orderItems = request.getOrderItems().stream().map(item -> {
            var product = productService.findProductById(item.getProductId());

            BigDecimal itemPrice = BigDecimal.valueOf(product.getPrice())
                    .multiply(BigDecimal.valueOf(item.getQuantity()));
            totalPrice.updateAndGet(t -> t.add(itemPrice));

            inventoryService.updateInventory(product, -item.getQuantity());
            return OrderItem.builder()
                    .product(product)
                    .quantity(item.getQuantity())
                    .price(BigDecimal.valueOf(product.getPrice()))
                    .order(order)
                    .build();
        }).collect(Collectors.toSet());

        order.setOrderItems(orderItems);

        // tính mã giảm giá
        BigDecimal discountedPrice = couponService.applyCouponIfPresent(totalPrice.get(), request.getCoupon());

        order.setDiscountedPrice(discountedPrice);
        return mapper.toOrderResponse(repository.save(order));
    }

    public Order getOrderById(long orderId) {
        return repository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
    }

    public OrderResponse confirmOrder(long orderId) {
        var order = getOrderById(orderId);

        if (order.getStatus() != OrderStatus.PENDING) {
            if (order.getStatus() == OrderStatus.CONFIRMED) {
                throw new AppException(ErrorCode.ORDER_ALREADY_CONFIRMED);
            }
            if (order.getStatus() == OrderStatus.DELIVERED) {
                throw new AppException(ErrorCode.ORDER_ALREADY_DELIVERED);
            }
            if (order.getStatus() == OrderStatus.CANCELLED) {
                throw new AppException(ErrorCode.ORDER_ALREADY_CANCELLED);
            }
            if (order.getStatus() == OrderStatus.SHIPPED) {
                throw new AppException(ErrorCode.ORDER_ALREADY_SHIPPED);
            }
        }
        order.setStatus(OrderStatus.CONFIRMED);
        return mapper.toOrderResponse(repository.save(order));
    }

    public OrderResponse shippedOrder(long orderId) {
        var order = getOrderById(orderId);
        if (order.getStatus() != OrderStatus.CONFIRMED) {
            if (order.getStatus() == OrderStatus.PENDING) {
                throw new AppException(ErrorCode.ORDER_NOT_CONFIRMED);
            }
            if (order.getStatus() == OrderStatus.SHIPPED) {
                throw new AppException(ErrorCode.ORDER_ALREADY_SHIPPED);
            }
            if (order.getStatus() == OrderStatus.DELIVERED) {
                throw new AppException(ErrorCode.ORDER_ALREADY_DELIVERED);
            }
            if (order.getStatus() == OrderStatus.CANCELLED) {
                throw new AppException(ErrorCode.ORDER_ALREADY_CANCELLED);
            }
        }
        order.setStatus(OrderStatus.SHIPPED);
        return mapper.toOrderResponse(repository.save(order));
    }

    public OrderResponse deliveredOrder(long orderId) {
        var order = getOrderById(orderId);
        if (order.getStatus() == OrderStatus.PENDING) {
            throw new AppException(ErrorCode.ORDER_NOT_CONFIRMED);
        }
        order.setStatus(OrderStatus.DELIVERED);
        return mapper.toOrderResponse(repository.save(order));
    }

    public OrderResponse cancelOrder(long orderId) {
        var order = getOrderById(orderId);
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new AppException(ErrorCode.ORDER_CAN_NOT_CANCEL_BECAUSE_IT_WAS_CONFIRMED_OR_SHIPPED);
        }
        order.setStatus(OrderStatus.CANCELLED);
        return mapper.toOrderResponse(repository.save(order));
    }

    public OrderResponse updateOrder(long orderId, OrderUpdateRequest request) {
        Order order = getOrderById(orderId);
        //

        order.setStatus(request.getStatus());
        return mapper.toOrderResponse(repository.save(order));
    }

    public Boolean deleteOrder(long orderId) {
        var order = repository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        order.getOrderItems().forEach(item -> {
            inventoryService.updateInventory(item.getProduct(), item.getQuantity());
        });
        repository.deleteById(orderId);
        return true;
    }


}
