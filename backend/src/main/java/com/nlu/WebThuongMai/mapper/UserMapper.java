package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.request.UserCreationRequest;
import com.nlu.WebThuongMai.dto.request.UserUpdateRequest;
import com.nlu.WebThuongMai.dto.response.UserResponse;
import com.nlu.WebThuongMai.model.User;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserCreationRequest Request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void toUser(@MappingTarget User user, UserUpdateRequest userUpdateRequest);

    UserResponse toUserResponse(User user);

    List<UserResponse> toUserResponseList(List<User> users);


    // Xử lý bỏ qua cả null và chuỗi rỗng
    default String mapString(String value) {
        return (value == null || value.trim().isEmpty()) ? null : value;
    }

}
