export interface UserResponse {
	id: number;

	/**
	 * Tên đăng nhập của người dùng
	 */
	username: string;

	/**
	 * Mật khẩu của người dùng
	 */
	password: string;

	/**
	 * Họ và tên đầy đủ của người dùng
	 */
	fullName: string;

	/**
	 * URL ảnh đại diện
	 */
	avatar: string;

	/**
	 * Ngày sinh (ISO string, ví dụ: '2000-01-01')
	 */
	birthday: string;

	/**
	 * Giới tính ('MALE' | 'FEMALE' | 'OTHER')
	 */
	gender: string;

	/**
	 * Địa chỉ email
	 */
	email: string;

	/**
	 * Số điện thoại
	 */
	phone: string;

	/**
	 * Địa chỉ nơi ở
	 */
	address: string;

	/**
	 * Vai trò người dùng ('USER' | 'ADMIN' ...)
	 */
	role: string;

	/**
	 * Trạng thái tài khoản ('ACTIVE' | 'INACTIVE' ...)
	 */
	status: string;

	/**
	 * Phương thức xác thực ('LOCAL' | 'GOOGLE' ...)
	 */
	authProvider: string;

	/**
	 * Thời điểm tạo tài khoản (ISO string)
	 */
	created_at: string;

	/**
	 * Thời điểm cập nhật gần nhất (ISO string)
	 */
	updated_at: string;
	coupons: string;
}
