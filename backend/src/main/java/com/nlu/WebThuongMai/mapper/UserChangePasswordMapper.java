package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.request.userReq.UserChangePasswordRequest;
import com.nlu.WebThuongMai.dto.response.userResp.UserChangePasswordResponse;
import com.nlu.WebThuongMai.model.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserChangePasswordMapper {

    /**
     * Cập nhật thông tin người dùng từ request
     * - Bỏ qua field null
     * - Không cập nhật nếu field là chuỗi rỗng
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mappings({
            @Mapping(target = "email", qualifiedByName = "mapString"),
    })
    void toUserChangePassword(@MappingTarget User user, UserChangePasswordRequest userChangePasswordRequest);

    UserChangePasswordResponse toUserChangePasswordResponse(User user);

    List<UserChangePasswordResponse> toUserChangePasswordResponseList(List<User> users);

    // Xử lý bỏ qua cả null và chuỗi rỗng
    @Named("mapString")
    default String mapString(String value) {
        return (value == null || value.trim().isEmpty()) ? null : value;
    }
}
