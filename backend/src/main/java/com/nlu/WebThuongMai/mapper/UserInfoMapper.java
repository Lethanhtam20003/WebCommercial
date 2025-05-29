package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.request.userReq.UserUpdateInfoRequest;
import com.nlu.WebThuongMai.dto.response.userResp.UserInforResponse;
import com.nlu.WebThuongMai.model.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserInfoMapper {

    /**
     * Cập nhật thông tin người dùng từ request
     * - Bỏ qua field null
     * - Không cập nhật nếu field là chuỗi rỗng
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mappings({
            @Mapping(target = "fullName", qualifiedByName = "mapString"),
            @Mapping(target = "avatar", qualifiedByName = "mapString"),
            @Mapping(target = "gender", qualifiedByName = "mapString"),
            @Mapping(target = "email", qualifiedByName = "mapString"),
            @Mapping(target = "phone", qualifiedByName = "mapString"),
            @Mapping(target = "address", qualifiedByName = "mapString"),
    })
    void toUserUpdateInfo(@MappingTarget User user, UserUpdateInfoRequest userUpdateInfoRequest);

    UserInforResponse toUserResponse(User user);

    List<UserInforResponse> toUserResponseList(List<User> users);

    // Xử lý bỏ qua cả null và chuỗi rỗng
    @Named("mapString")
    default String mapString(String value) {
        return (value == null || value.trim().isEmpty()) ? null : value;
    }
}
