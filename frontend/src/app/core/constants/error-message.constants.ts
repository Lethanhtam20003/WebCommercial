export class ErrorMessageConstants {
	static readonly pleaseEnterUsername: string = 'Vui lòng nhập tài khoản';
	static readonly pleaseEnterPassword: string = 'Vui lòng nhập mật khẩu';
	// static readonly pleaseEnterConfirmPassword: string='Vui lòng nhập lại mật khẩu';
	static readonly pleaseEnterEmail: string = 'Vui lòng nhập email';
	static readonly usernameHasAtLeast3Characters: string =
		'Tài khoản phải có ít nhất 3 ký tự';
	static readonly passwordHasAtLeast8CharactersAndSmallerThan30: string =
		'Mật khẩu phải có ít nhất 8 ký tự và phải có nhỏ hơn 30 ký tự';
	static readonly retypePasswordMustBeSame: string =
		'Nhập lại mật khẩu không khớp với mật khẩu';
	static readonly emailIsNotValid: string = 'Email không hợp lệ';
	static readonly UnknownErrorOccurred: string = 'Đã xảy ra lỗi không xác định';
	static readonly userNotExisted: string = 'Tài khoản không tồn tại';
	static readonly passwordNotCorrect: string = 'Mật khẩu không chính xác';
	static readonly cannotUploadImage: string = 'Không thể upload hình ảnh';
	static readonly imageIsOversized: string = 'Hình ảnh có dung luọng quá 5 Mb';
	static readonly imageIsNotInAllowedType: string =
		'Hình ảnh không đúng định dạng cho phép';
	static readonly userNameIsNotEmpty: string =
		'Tên tài khoản không được để trống';
	static readonly fullNameIsNotEmpty: string = 'Họ tên không được để trống';
	static readonly emailIsNotEmpty: string = 'Email không được để trống';
	static readonly phoneNumIsNotEmpty: string =
		'Số điện thoại không được để trống';
	static readonly phoneNumIsInvalid: string = 'Số điện thoại không hợp lệ';
	static readonly genderIsNotEmpty: string = 'Giới tính không được để trống';
	static readonly meetAnError: string = 'Có lỗi xảy ra';
  static readonly pleaseEnterEmailOrPhone: string='Vui lòng nhập email hoặc số điện thoại';
  static readonly userExisted: string='Tài khoản đã tồn tại';
  static readonly phoneExisted: string='Điện thoại đã tồn tại';
  static readonly emailExisted: string='Email đã tồn tại';
}
