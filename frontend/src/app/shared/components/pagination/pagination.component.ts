import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-pagination',
	imports: [CommonModule, NgFor, NgIf],
	templateUrl: './pagination.component.html',
	styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
	@Input() totalPages = 1;
	@Input() currentPage = 1;
	@Output() pageChange = new EventEmitter<number>();

	get pages(): number[] {
		const pages: number[] = [];
		for (let i = 1; i <= this.totalPages; i++) {
			pages.push(i);
		}
		return pages;
	}

	goToPage(page: number) {
		if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
			this.pageChange.emit(page);
		}
	}

	prevPage() {
		this.goToPage(this.currentPage - 1);
	}

	nextPage() {
		this.goToPage(this.currentPage + 1);
	}
}
