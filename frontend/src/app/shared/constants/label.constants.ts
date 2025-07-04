const productLabel = {
	product: 'sản phẩm',
	newProduct: 'Hàng mới',
	sport: 'Môn thể thao',
	badminton: 'Cầu lông',
	pickleball: 'Pickle ball',
};

const uerProfileLabel = {
	imageFileNoLargerThan5Mb:
		'File có đuôi JPG hoặc PNG có kích thước không vượt quá 5 MB',
	uploadNewImage: 'Tải hình ảnh lên',
	address: 'Địa chỉ',
	birthDay: 'Ngày sinh',
	saveChanges: 'Lưu lại thay đổi',
	enterYourBirthday: 'Nhập ngày sinh',
	enterYourPhoneNumber: 'Nhập số điện thoại',
	enterYourEmailAddress: 'Nhập địa chỉ email',
	enterYourLocation: 'Nhập địa chỉ',
	enterYourOrganizationName: 'Nhập địa chỉ',

	gender: 'Giới tính',
	male: 'Nam',
	female: 'Nữ',
	other: 'Khác',

	profilePicture: 'Hình ảnh đại diện',
	onWorkingProcess: 'Đang trong quá trình thực hiện',
	pleaseWaitAMinute: 'Vui lòng đợi một chút',

	myAccount: 'Tài khoản của tôi',
	updateUserProfile: 'Sửa hồ sơ',
	changePassword: 'Đổi mật khẩu',
};

const orderLabel = {
	all: 'tất cả',
	pending: 'đang giải quyết',
	shipped: 'đã vận chuyển',
	delivered: 'đã giao hàng',
	canceled: 'đã huỷ',
	invoice: 'hoá đơn',
	order: 'đặt hàng',
	cart: 'Giỏ hàng',
};

export const LabelConstants = {
	logIn: 'Đăng nhập',
	logOut: 'Đăng xuất',
	register: 'Đăng ký',
	forgotPassword: 'Quên mật khẩu',
	username: 'Tên đăng nhập',
	password: 'Mật khẩu',
	confirmPassword: 'Xác nhận mật khẩu',
	email: 'Email',
	phone: 'Số điện thoại',
	loginWithOther: 'Hoặc là bạn có thể đăng nhập bằng các tài khoản khác',
	logInPage: 'Đăng nhập',
	registerPage: 'Đăng ký',
	forgotPasswordPage: 'Quên mật khẩu',
	returnToLogin: 'trở về trang đăng nhập',
	retypePassword: 'Nhập lại mật khẩu',
	ifUHaveAnAccount: 'Nếu bạn đã có tài khoản, bạn có thể',
	information: 'Thông tin',
	aboutUs: 'Về chúng tôi',
	termAndCondition: 'Chính sách và thoả thuận khách hàng',
	contactUs: 'Liên hệ',
	help: 'Trợ giúp',
	faqs: 'Câu hỏi thường gặp',
	callUs: 'Nếu có thắc mắc thì có thể liên lạc với chúng tôi qua hotline',
	hotLinePhoneNum: '+0123 456 789',
	customerService: 'Dịch vụ khách hàng',
	paymentMethods: 'Phương thức thanh toán',
	moneyBack: 'Thủ tục hoàn tiền',
	return: 'Phương thức đổi trả',
	shipping: 'Phương thức vận chuyển',
	privacyPolicy: 'Chính sách bảo mật',
	getInTouch: 'Liên lạc',
	numberAndStreet: 'Khu phố 6, phường Linh Trung',
	cityAndCountry: 'Thành phố Thủ Đức, Tp. Hồ Chí Minh',
	organizationEmail: '21130530@st.hcmuaf.edu.vn',
	organizationPhoneNumber: '+842 3456 7890',
	description:
		'Fire Knight Sport là cửa hàng chuyên về bán dụng cụ thể thao như cầu lông, đá banh, bóng chuyền, tenis, bóng bàn các loại.',
	userProfile: 'Hồ sơ của tôi',
	searchProduct: 'Tìm kiếm sản phẩm',
	logInWithGoogle: 'Đăng nhập bằng google',
	signUpWithGoogle: 'Đăng ký bằng google',
	home: 'Trang chủ',
	or: 'hoặc',
	signInWithGoogle: 'Đăng nhập bằng Google',
	signInWithFacebook: 'Đăng nhập bằng Facebook',
	ProcessingLogin: 'Đăng nhập bằng Github',
	userAccount: 'Tài khoản',
	coupon: 'Mã giảm giá',
	couponList: 'Kho vouchers',
	firstName: 'tên',
	lastName: 'họ',

	/**
	 * user profile
	 */
	...uerProfileLabel,

	/**
	 * dành cho hoá đơn
	 */
	...orderLabel,

	logoutSuccess: 'Đăng xuất thành công',
	loginFails: 'Đăng nhập thất bại',

	newPassword: 'Mật khẩu mới',
	adminPage: 'Trang quản lý',
	/**
	 * product label
	 */
	...productLabel,
} as const;
