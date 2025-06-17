export interface Page<T> {
	content: T[];
	page: {
		totalElements: number;
		totalPages: number;
		number: number;
		size: number;
	};
}
