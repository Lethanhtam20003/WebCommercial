import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../../../core/models/response/user/user-response.interface';
import { UserService } from '../../../../core/service/user.service';
import { catchError, of } from 'rxjs';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { Page } from '../../../../core/models/response/page-response.interface';
import { UserProfile } from '../../../../core/models/response/user/user-profile-response.model';
import { UtitlyService } from '../../../../core/service/utility.service';
import { FilterField } from '../../../../shared/components/generic-filter/generic-filter-field.interface';
import { GenericFilterComponent } from '../../../../shared/components/generic-filter/generic-filter.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { AlertService } from '../../../../core/service/alert.service';

@Component({
	selector: 'app-customer-management',
	imports: [CommonModule, GenericFilterComponent, PaginationComponent],
	templateUrl: './customer-management.component.html',
	styleUrls: ['./customer-management.component.scss'],
})
export class CustomerManagementComponent implements OnInit {
	users: UserResponse[] = [];
	protected currentPage: number = 1;
	private pageSize: number = 10;
	filterValues: Record<string, any> = {};
	protected totalPages = 1;
	showFilter = false;

	fields: FilterField[] = [
		{ name: 'username', label: 'Username', type: 'text' },
		{ name: 'email', label: 'Email', type: 'text' },
		{ name: 'phone', label: 'SĐT', type: 'text' },
		{
			name: 'status',
			label: 'Trạng thái',
			type: 'select',
			options: [
				{ label: 'Còn hoạt động', value: 'ACTIVE' },
				{ label: 'Chờ duyệt', value: 'PENDING' },
				{ label: 'Bị cấm', value: 'BANNED' },
			],
		},
		{
			name: 'authProvider',
			label: 'Phương thức đăng nhập',
			type: 'select',
			options: [
				{ label: 'Local', value: 'LOCAL' },
				{ label: 'Google', value: 'GOOGLE' },
				{ label: 'Facebook', value: 'FACEBOOK' },
			],
		},
		{
			name: 'createdAt',
			label: 'Ngày tạo',
			type: 'date', // <-- kiểu date là được
		},
	];

	constructor(
		private userService: UserService,
		protected utility: UtitlyService,
    private alert: AlertService,
	) {}

	ngOnInit() {
		this.loadUsers();
	}

	loadUsers(): void {
		const sanitizedFilters = this.sanitizeFilterValues(this.filterValues);

		this.userService
			.getAllUsersAdmin({
				page: this.currentPage < 0 ? 0 : this.currentPage - 1,
				size: this.pageSize,
				...sanitizedFilters,
			})
			.pipe(
				catchError(err => {
					console.error('❌ Lỗi khi lấy danh sách khuyến mãi:', err);
					return of({
						result: {
							content: [],
							page: {
								totalPages: 0,
								totalElements: 0,
								size: 0,
								number: 0,
							},
						},
					} as ApiResponse<Page<UserResponse>>);
				})
			)
			.subscribe((res: ApiResponse<Page<UserResponse>>) => {
				this.users = res.result.content;
				this.totalPages = res.result.page.totalPages;
			});
	}

	onFilterChanged(values: Record<string, any>) {
		this.filterValues = values;
		this.currentPage = 1;
		this.loadUsers();
	}

	sanitizeFilterValues(values: Record<string, any>): Record<string, any> {
		const sanitized: Record<string, any> = {};
		for (const key in values) {
			const value = values[key];
			sanitized[key] =
				typeof value === 'string' ? value.trim().replace(/\s+/g, '') : value;
		}
		return sanitized;
	}

	onPageChange(page: number): void {
		this.currentPage = page;
		this.loadUsers();
	}

	toggleFilter() {
		this.showFilter = !this.showFilter;
	}

	banUser(user: UserResponse): void {
		this.alert
			.confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.fullName}" không?`)
			.then(confirmed => {
				if (!confirmed) return;

				// Gọi API xoá user
				this.userService.banUser(user.id).subscribe({
					next: () => {
						this.alert.success('Đã xóa người dùng');
						this.loadUsers(); // hoặc reload lại danh sách nếu có hàm load
					},
					error: err => {
						console.error('❌ Lỗi khi xóa người dùng:', err);
						this.alert.error('Xóa người dùng thất bại');
					},
				});
			});
	}
}
