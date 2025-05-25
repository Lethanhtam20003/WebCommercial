package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.productReq.SupplierRequest;
import com.nlu.WebThuongMai.dto.response.productResp.SupplierResponse;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.mapper.SupplierMapper;
import com.nlu.WebThuongMai.model.Supplier;
import com.nlu.WebThuongMai.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class SupplierService {
    private final SupplierRepository repository;
    private final SupplierMapper mapper;

    /**
     * kiểm tra nhà cung cấp đã tồn tài chưa ?
     * @param name tên của nhà cung cấp
     * @return true nếu nhà cung cấp đã tồn tại, false nếu chưa
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    public boolean checkSupplier(String name) {
        return repository.existsByName(name);
    }

    /**
     * tạo nhà cung cấp mới
     * @param request đối tượng chứa thông tin cần tạo
     * @return SupplierResponse chứa thông tin nhà cung cấp mới
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    public SupplierResponse createSupplier(SupplierRequest request) {
        if (checkSupplier(request.getName())) {
            throw new AppException(ErrorCode.SUPPLIER_EXISTED);
        }
        return mapper.toSupplierResponse(repository.save(mapper.toSupplier(request)));
    }

    /**
     * lấy danh sách nhà cung cấp
     * @param pageable số lượng phân trang
     * @return danh sách nhà cung cấp
     */

    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<SupplierResponse> getAllSupplier(Pageable pageable) {
        return mapper.toPageSupplierResponse(repository.findAll(pageable));
    }

    /**
     * lấy nhà cung cấp theo id
     * @param supplierId id nhà cung cấp
     * @return thông tin nhà cung cấp
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    public SupplierResponse getSupplierById(long supplierId) {
        return mapper.toSupplierResponse(repository.findById(supplierId)
                .orElseThrow(() -> new AppException(ErrorCode.SUPPLIER_NOT_FOUND)));
    }

    /**
     * cập nhật thông tin nhà cung cấp
     * @param supplierId id nhà cung cấp
     * @param request thông tin cần cập nhật
     * @return thông tin nhà cùn cấp sau khi cập nhật
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    public SupplierResponse updateSupplier(long supplierId, SupplierRequest request) {
         Supplier supplier = repository.findById(supplierId)
                .orElseThrow(() -> new AppException(ErrorCode.SUPPLIER_NOT_FOUND));
         if(!request.getName().equals(supplier.getName())){
             if(checkSupplier(request.getName())){
                 throw new AppException(ErrorCode.SUPPLIER_NAME_EXISTED);
             }
         }
        return mapper.toSupplierResponse(
                repository.save(
                        mapper.toSupplier(supplierId,request)));

    }
}
