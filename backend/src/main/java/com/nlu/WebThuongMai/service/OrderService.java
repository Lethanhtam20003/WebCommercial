package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.orderReq.GetAllOrderAdminRequest;
import com.nlu.WebThuongMai.dto.request.orderReq.OrderCreateRequest;
import com.nlu.WebThuongMai.dto.request.orderReq.OrderUpdateRequest;
import com.nlu.WebThuongMai.dto.response.orderResp.OrderResponse;
import com.nlu.WebThuongMai.enums.OrderStatus;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.mapper.OrderMapper;
import com.nlu.WebThuongMai.model.Order;
import com.nlu.WebThuongMai.model.OrderItem;
import com.nlu.WebThuongMai.dto.request.orderReq.OrderFilterRequest;
import com.nlu.WebThuongMai.repository.OrderRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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
    @Transactional
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
            if (!inventoryService.hasEnoughStock(product.getId(), item.getQuantity())) {
                throw new AppException(ErrorCode.PRODUCT_NOT_ENOUGH_IN_STOCK);
            }
            inventoryService.exportInventory(product.getId(), item.getQuantity());
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
    @Transactional
    public Boolean deleteOrder(long orderId) {
        var order = repository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        // Chỉ cho phép huỷ đơn PENDING
        if (!order.getStatus().equals(OrderStatus.PENDING)) {
            throw new AppException(ErrorCode.ORDER_CAN_NOT_CANCEL_BECAUSE_IT_WAS_CONFIRMED_OR_SHIPPED);
        }

        // Trả hàng về kho
        order.getOrderItems().forEach(item ->
                inventoryService.importInventory(item.getProduct().getId(), item.getQuantity())
        );
        repository.delete(order);
        return true;
    }

    @PreAuthorize("hasAuthority('USER')")
    public Page<OrderResponse> findOrdersByUserIdAndStatus(OrderFilterRequest orderFilterRequest) {
        Pageable pageable = PageRequest.of(orderFilterRequest.getPage(), orderFilterRequest.getSize());
        Page<Order> orders = repository.findOrdersByUserIdAndStatus(orderFilterRequest.getUserId(), orderFilterRequest.getStatus(), pageable);

        return orders.map(mapper::toOrderResponse);
    }

    @Transactional
    @PreAuthorize("hasAuthority('USER')")
    public Page<OrderResponse> getOrdersById(Long userId, Pageable pageable) {
        Page<Order> orders = repository.findOrdersByUserId(userId, pageable);

        return orders.map(mapper::toOrderResponse);
    }

    @Transactional(readOnly = true)
    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<OrderResponse> filterOrdersByAdmin(GetAllOrderAdminRequest request, int page, int size) {
        // Xử lý logic default và ưu tiên
        LocalDate dateFrom = request.getCreatedDateFrom();
        LocalDate dateTo = request.getCreatedDateTo();

        // Nếu cả hai đều null => fetch toàn bộ
        // Nếu chỉ dateFrom null, lấy dateTo (hoặc now nếu dateTo cũng null)
        if (dateFrom == null && dateTo != null) {
            dateFrom = dateTo;
        }
        // Nếu dateTo null, set dateTo = hôm nay
        if (dateTo == null && dateFrom != null) {
            dateTo = LocalDate.now();
        }
        // Nếu cả hai null, để nguyên không filter

        Specification<Order> spec = Specification.where(null);

        if (dateFrom != null && dateTo != null) {
            LocalDateTime from = dateFrom.atStartOfDay();
            LocalDateTime to = dateTo.atTime(23, 59, 59);
            spec = spec.and((root, query, cb) -> cb.between(root.get("createdDate"), from, to));
        }

        if (request.getUsername() != null && !request.getUsername().isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("user").get("username")), "%" + request.getUsername().toLowerCase() + "%")
            );
        }

        if (request.getTotalPrice() != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("totalPrice"), request.getTotalPrice()));
        }

        if (request.getStatus() != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), request.getStatus()));
        }

        // Ưu tiên sắp xếp: ngày tạo DESC > username ASC > totalPrice DESC > status ASC
        Pageable pageable = PageRequest.of(page, size, Sort.by(
                Sort.Order.desc("createdDate"),
                Sort.Order.asc("user.username"),
                Sort.Order.desc("totalPrice"),
                Sort.Order.asc("status")
        ));

        Page<Order> orderPage = repository.findAll(spec, pageable);
        Page<OrderResponse> responsePage = orderPage.map(order -> {
            order.getOrderItems().size();
            return mapper.toOrderResponse(order);
        });
        return responsePage;
    }
}
