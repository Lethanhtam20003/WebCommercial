import { ProductDescription } from '../../features/product/product-detail/product-detail.component';

export function parseDescription(raw: string): ProductDescription {
	const parts = raw
		.split(';')
		.map(p => p.trim())
		.filter(p => p && p !== '-');

	let usage: string | null = null;
	let style: string | null = null;
	let highlights: string[] = [];
	let material: string | null = null;
	let colors: string | null = null;
	let sizes: string | null = null;
	let moreInfoList: string[] = [];

	let i = 0;
	while (i < parts.length) {
		const part = parts[i].toLowerCase();

		if (part.includes('thi đấu')) {
			usage = parts[i];
			i++;
		} else if (part.includes('kiểu dáng')) {
			style = parts[i + 1]?.trim() || null;
			i += 2;
		} else if (part.includes('đặc điểm nổi bật')) {
			i++;
			while (
				i < parts.length &&
				!parts[i].toLowerCase().includes('thông số kỹ thuật')
			) {
				highlights.push(parts[i]);
				i++;
			}
		} else if (part.includes('thông số kỹ thuật')) {
			i++;
			while (i < parts.length) {
				const line = parts[i].toLowerCase();
				if (line.includes('chất liệu')) {
					material = extractValue(parts[i + 1]);
					i += 2;
				} else if (line.includes('màu sắc')) {
					colors = extractValue(parts[i + 1]);
					i += 2;
				} else if (line.includes('kích thước')) {
					sizes = extractValue(parts[i + 1]);
					i += 2;
				} else {
					i++;
				}
			}
		} else {
			// Dữ liệu thêm
			const current = parts[i];
			const next = parts[i + 1];
			if (current && next && isContactLike(current, next)) {
				moreInfoList.push(`${capitalize(current)}: ${next}`);
				i += 2;
			} else {
				moreInfoList.push(current);
				i++;
			}
		}
	}

	return {
		usage,
		style,
		highlights,
		specifications: {
			material,
			colors,
			sizes,
		},
		moreInfo: moreInfoList.length > 0 ? moreInfoList.join(' | ') : null,
	};
}

function extractValue(text: string | undefined): string | null {
	if (!text) {
		return null;
	}
	const parts = text.split(':');
	return parts.length > 1 ? parts[1].trim() : text.trim();
}

function isContactLike(label: string, value: string): boolean {
	const phonePattern = /^[0-9 .\-+()]{6,}$/;
	return phonePattern.test(value);
}

function capitalize(text: string): string {
	return text.charAt(0).toUpperCase() + text.slice(1);
}
