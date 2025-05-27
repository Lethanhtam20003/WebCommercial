export interface UserUpdateRequest {
  /**
   * Mật khẩu mới của người dùng
   */
  password?: string;

  /**
   * Tên của người dùng
   */
  firstName?: string;

  /**
   * Họ của người dùng
   */
  lastName?: string;

  /**
   * Ngày sinh của người dùng (định dạng ISO, ví dụ: "1990-01-01")
   */
  birthday?: string;

  /**
   * URL ảnh đại diện của người dùng
   */
  avatar?: string;

  /**
   * Giới tính của người dùng (ví dụ: "male", "female", "other")
   */
  gender?: string;

  /**
   * Email của người dùng
   */
  email?: string;

  /**
   * Số điện thoại của người dùng
   */
  phone?: string;

  /**
   * Địa chỉ của người dùng
   */
  address?: string;

  /**
   * Trạng thái tài khoản (ví dụ: "active", "inactive", "banned")
   */
  status?: string;
}

export interface UserResponse {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	avatar: string;
	birthday: string; // backend trả LocalDate => frontend nhận dạng string
	gender: string;
	email: string;
	phone: string;
	address: string;
	role: string; // hoặc enum nếu bạn define enum Role ở FE
	status: string;
	authProvider: string;
	created_at: string;
	updated_at: string;
}
