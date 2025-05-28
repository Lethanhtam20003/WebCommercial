export const ErrorMessageConstants = {
	pleaseEnterUsername: 'Vui lòng nhập tài khoản',
	pleaseEnterPassword: 'Vui lòng nhập mật khẩu',
	pleaseEnterEmail: 'Vui lòng nhập email',
	usernameHasAtLeast3Characters: 'Tài khoản phải có ít nhất 3 ký tự',
	passwordHasAtLeast8CharactersAndSmallerThan30:
		'Mật khẩu phải có ít nhất 8 ký tự và phải có nhỏ hơn 30 ký tự',
	retypePasswordMustBeSame: 'Nhập lại mật khẩu không khớp với mật khẩu',
	emailIsNotValid: 'Email không hợp lệ',
	UnknownErrorOccurred: 'Đã xảy ra lỗi không xác định',
	userNotExisted: 'Tài khoản không tồn tại',
	passwordNotCorrect: 'Mật khẩu không chính xác',

  cannotUploadImage: 'Không thể upload hình ảnh',
	imageIsOversized: 'Hình ảnh có dung luọng quá 5 Mb',
	imageIsNotInAllowedType: 'Hình ảnh không đúng định dạng cho phép',
  errorInUploadImagePleaseTryAgain: 'Đã có lỗi khi upload ảnh. Vui lòng thử lại!',

  userNameIsNotEmpty: 'Tên tài khoản không được để trống',
	fullNameIsNotEmpty: 'Họ tên không được để trống',
	emailIsNotEmpty: 'Email không được để trống',
	phoneNumIsNotEmpty: 'Số điện thoại không được để trống',
	phoneNumIsInvalid: 'Số điện thoại không hợp lệ',
	genderIsNotEmpty: 'Giới tính không được để trống',
	meetAnError: 'Có lỗi xảy ra',

  pleaseEnterEmailOrPhone: 'Vui lòng nhập email hoặc số điện thoại',
	userExisted: 'Tài khoản đã tồn tại',
	phoneExisted: 'Điện thoại đã tồn tại',
	emailExisted: 'Email đã tồn tại',

	pleaseEnterReEnterPassword: 'Vui lòng nhập lại mật khẩu',
	passwordHasAtMost30Characters: 'Mật khẩu không được quá 30 ký tự',
	passwordHasAtLeast8Characters: 'Mật khẩu phải có ít nhất 8 ký tự',
	retypePasswordIsNotEmpty: 'Nhập lại mật khẩu không được để trống',
	passwordIsNotEmpty: 'Mật khẩu không được để trống',

  errorInGettingUserInfo: 'Có lỗi xảy ra khi lấy thông tin người dùng',
  errorInUpdateUserInfo: 'Có lỗi xảy ra khi cập nhật thông tin người dùng',
  cannotLoadUserInfo: 'Không thể tải thông tin người dùng',

  firstNameIsNotEmpty: 'Tên người dùng không được để trống',
  lastNameIsNotEmpty: 'Họ người dùng không được để trống',
  currentUserIsunidentified: 'Người dùng hiện tại Không thể xác định',
  addressIsNotEmpty: 'Địa chỉ không được để trống',
  birthdayIsNotEmpty: 'Ngày sinh không được để trống',

  changePasswordFail: 'Đổi mật khẩu thất bại',
  errorWhenLoadingUserOrder: 'Lỗi khi load đơn hàng user',
  errorWhenLoadingAdminOrder: 'Lỗi khi load đơn hàng user',
} as const;
