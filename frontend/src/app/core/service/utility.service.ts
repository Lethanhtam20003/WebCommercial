import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class UtitlyService {
	capitalize(str: string): string {
		if (!str) return '';
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	convertDdMmYyyyToIso(dateStr: string): string {
		if (!dateStr) return '';

		// dateStr expected format: "dd/MM/yyyy"
		const [day, month, year] = dateStr.split('/');
		if (!day || !month || !year) {
			throw new Error('Invalid date format, expected dd/MM/yyyy');
		}
		// return ISO format: yyyy-MM-dd
		return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
	}

	convertIsoToDdMmYyyy(isoDateStr: string): string {
		if (!isoDateStr) return '';

		// isoDateStr expected format: "yyyy-MM-dd"
		const [year, month, day] = isoDateStr.split('-');
		if (!year || !month || !day) {
			throw new Error('Invalid ISO date format, expected yyyy-MM-dd');
		}

		// return format: "dd/MM/yyyy"
		return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
	}
}
