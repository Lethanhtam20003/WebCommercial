import { ProductLabel } from "../models/response/product-response/ProductLabel";

export function nameTolabel(name: string, category: string): ProductLabel {
		// switch (category) {
		// 	case 'Cầu lông':
				const result: ProductLabel = {
					name: name.trim(),
				};

				// Giới tính
				const genderMatch = name.match(/\b(Nam|Nữ)/i);
				if (genderMatch) {
					result.gender = genderMatch[0];
				}

				// Màu sắc trong dấu ngoặc kép
				const colorMatch = name.match(/"([^"]+)"/);
				if (colorMatch) {
					result.color = colorMatch[1];
				}

				// Kiểm tra chính hãng
				result.isOfficial = /Hàng Chính Hãng/i.test(name);

				// Model (sau giới tính và tên thương hiệu)
				// VD: Động Lực Jogarbola Kira => model = Jogarbola Kira
				const modelRegex = /\b(Nam|Nữ|Unisex)\b\s+(.*?)\s+"[^"]+"/i;
				
				const modelMatch = name.match(modelRegex);
				if (modelMatch) {
					result.model = modelMatch[2].trim();
				}

				return result;
		// }

		// return { name: name };
	}