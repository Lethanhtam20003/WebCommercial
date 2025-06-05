export interface UserChangePasswordRequest {
	email: string;
	oldPassword: string;
	newPassword: string;
}
