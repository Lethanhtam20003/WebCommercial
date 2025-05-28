package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.request.userReq.UserCreationRequest;
import com.nlu.WebThuongMai.dto.request.userReq.UserUpdateRequest;
import com.nlu.WebThuongMai.dto.response.userResp.UserFacebook;
import com.nlu.WebThuongMai.dto.response.userResp.UserResponse;
import com.nlu.WebThuongMai.model.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    User toUser(UserCreationRequest Request);

    /**
     * NullValuePropertyMappingStrategy.IGNORE các giá trị null sẽ ko dc map vao giữ nguyên giá trị cũ
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void toUser(@MappingTarget User user, UserUpdateRequest userUpdateRequest);

    UserResponse toUserResponse(User user);

    List<UserResponse> toUserResponseList(List<User> users);

    @Mapping(target = "id", ignore = true) // Bỏ qua ID
    @Mapping(target = "authProvider", constant = "FACEBOOK")
    @Mapping(target = "authProviderId", source = "id")
    @Mapping(target = "username", source = "name")
    @Mapping(target = "fullName", source = "name")
    @Mapping(target = "avatar", source = "picture.data.url")
    @Mapping(target = "role", constant = "USER")
    User userFacebookToUser(UserFacebook userFacebook);

    // Xử lý bỏ qua cả null và chuỗi rỗng
    default String mapString(String value) {
        return (value == null || value.trim().isEmpty()) ? null : value;
    }

}
