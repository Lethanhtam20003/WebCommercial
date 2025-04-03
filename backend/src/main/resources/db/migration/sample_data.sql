INSERT INTO categories (name, description)
VALUES ('Giày thể thao', 'Các loại giày chạy bộ, giày đá bóng, giày tennis...'),
       ('Dụng cụ bóng đá', 'Bóng đá, găng tay thủ môn, lưới, cọc đá phạt...'),
       ('Dụng cụ tập gym', 'Tạ tay, dây kháng lực, máy chạy bộ, thảm yoga...'),
       ('Dụng cụ bơi lội', 'Kính bơi, nón bơi, quần áo bơi, phao bơi...'),
       ('Dụng cụ bóng rổ', 'Bóng rổ, trụ rổ, giày bóng rổ...'),
       ('Dụng cụ cầu lông', 'Vợt cầu lông, cầu lông, lưới cầu lông...'),
       ('Dụng cụ tennis', 'Vợt tennis, bóng tennis, lưới tennis...'),
       ('Dụng cụ leo núi', 'Dây leo núi, móc khóa, giày leo núi, găng tay leo núi...'),
       ('Dụng cụ chạy bộ', 'Đồng hồ GPS, áo chạy bộ, bình nước cầm tay...'),
       ('Dụng cụ đạp xe', 'Xe đạp thể thao, mũ bảo hiểm, găng tay đạp xe...');


INSERT INTO products (name, price, description, status, category_id)
VALUES ('Giày chạy bộ Nike Air Zoom', 150, 'Giày chạy bộ chuyên nghiệp với đệm khí', 'ACTIVE', 1),
       ('Giày đá bóng Adidas Predator', 180, 'Giày đá bóng sân cỏ nhân tạo', 'ACTIVE', 1),
       ('Bóng đá FIFA Pro', 50, 'Bóng đạt chuẩn thi đấu FIFA', 'ACTIVE', 2),
       ('Găng tay thủ môn Adidas', 40, 'Găng tay chống trượt cho thủ môn', 'ACTIVE', 2),
       ('Tạ tay 10kg', 30, 'Tạ tay dùng trong tập gym', 'ACTIVE', 3),
       ('Dây kháng lực đa năng', 25, 'Hỗ trợ luyện tập sức mạnh cơ bắp', 'ACTIVE', 3),
       ('Kính bơi Speedo', 20, 'Kính bơi chống sương mờ', 'ACTIVE', 4),
       ('Áo bơi nam Arena', 35, 'Áo bơi chống tia UV', 'ACTIVE', 4),
       ('Bóng rổ Spalding', 60, 'Bóng rổ tiêu chuẩn NBA', 'ACTIVE', 5),
       ('Trụ rổ di động', 250, 'Trụ rổ có thể điều chỉnh độ cao', 'ACTIVE', 5),
       ('Vợt cầu lông Yonex', 90, 'Vợt cầu lông chuyên nghiệp', 'ACTIVE', 6),
       ('Cầu lông lông vũ', 15, 'Bộ cầu lông lông vũ cao cấp', 'ACTIVE', 6),
       ('Vợt tennis Wilson', 150, 'Vợt tennis cho người mới chơi', 'ACTIVE', 7),
       ('Bóng tennis Dunlop', 20, 'Bóng tennis tiêu chuẩn thi đấu', 'ACTIVE', 7),
       ('Dây leo núi cao cấp', 80, 'Dây leo núi chịu tải trọng lớn', 'ACTIVE', 8),
       ('Găng tay leo núi', 35, 'Găng tay chống trơn trượt khi leo núi', 'ACTIVE', 8),
       ('Đồng hồ chạy Garmin', 300, 'Đồng hồ GPS hỗ trợ chạy bộ', 'ACTIVE', 9),
       ('Áo chạy bộ chống thấm', 45, 'Áo thể thao siêu nhẹ và kháng nước', 'ACTIVE', 9),
       ('Xe đạp thể thao Giant', 1200, 'Xe đạp địa hình chuyên nghiệp', 'ACTIVE', 10),
       ('Mũ bảo hiểm đạp xe', 60, 'Mũ bảo hiểm siêu nhẹ, thoáng khí', 'ACTIVE', 10);
