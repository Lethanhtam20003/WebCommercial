INSERT INTO public.users (birthday,created_at,updated_at,avatar,address,auth_provider,coupons,email,full_name,gender,"password",phone,provider_id,"role",status,username) VALUES
	 ('1988-10-06','2025-05-30 19:32:12.030078',NULL,'https://res.cloudinary.com/doabxq0zi/image/upload/v1748608281/jvw0damq4xevdhcfkm93.jpg','San Francisco, CA','GOOGLE',NULL,'phamnhuttan.9a6.2017@gmail.com','Nhựt Tân','MALE',NULL,'0123456789','101575677715515218629','USER',NULL,'Nhựt Tân'),
	 (NULL,'2025-05-30 20:47:17.417864',NULL,NULL,NULL,'LOCAL',NULL,'abc@gmail.com',NULL,NULL,'$2a$10$SDO15GQB0XKkLMxqKqnU9u3YUAnYfnOGGw5ssaJ1ukCCiab6oosJi',NULL,NULL,'USER',NULL,'nhuttan'),
	 ('1988-10-06','2025-05-30 21:00:04.361355',NULL,'https://res.cloudinary.com/doabxq0zi/image/upload/v1748613561/ipbgy0xknccng9z3lkje.png','Tan An','LOCAL',NULL,'nhuttan123@gmail.com','Nhut Tan','MALE','$2a$10$234mH6skVTncX/5zmX.Og./Mcq0w2jVPr90qB1zaPe/zg00HHA0Ua','0123456899',NULL,'USER',NULL,'phamnhuttan'),
	 ('1988-10-06','2025-05-30 21:03:20.456007',NULL,'https://res.cloudinary.com/doabxq0zi/image/upload/v1748613767/ila21urom34ai6lpuaxm.png','Tan An','LOCAL',NULL,'nhuttan1213@gmail.com','Nhuttan','MALE','$2a$10$OAXWV4bWgws32PCx2RmAQuOyy/SIXtY6AXKgUcAKNwBHXEc/QR/P2','01235456567',NULL,'USER',NULL,'phamnhuttan1'),
	 (NULL,'2025-05-30 19:33:21.951748',NULL,NULL,NULL,'LOCAL',NULL,'tan123@gmail.com',NULL,NULL,'$2a$12$Nu30ono3AEInlF9YpVtOmuOyAmhPc1wSUdtJTgQPJdWmqopLC8qe6',NULL,NULL,'USER',NULL,'tan');

INSERT INTO coupons (code, discount, description, limit_users, expiration_date, status, type, price_condition, min_price)
values 
    ('SUMMER2025', 10.0, 'Giảm 10% cho đơn hàng mùa hè', 100, '2025-12-31 23:59:59', 'ACTIVE', 'PERCENTAGE', 500000.00, 100000.00),
    ('FIXED500K', 500000.00, 'Giảm 500K cho đơn hàng trên 2 triệu', 50, '2025-11-30 23:59:59', 'ACTIVE', 'AMOUNT', 2000000.00, 2000000.00),
    ('WELCOME10', 5.0, 'Giảm 5% cho khách hàng mới', 200, '2026-01-01 23:59:59', 'ACTIVE', 'PERCENTAGE', 300000.00, 50000.00),
    ('EXPIRED2024', 15.0, 'Mã giảm giá đã hết hạn', 10, '2024-06-30 23:59:59', 'INACTIVE', 'PERCENTAGE', 1000000.00, 200000.00),
    ('VIP100K', 100000.00, 'Giảm 100K cho khách VIP', 20, '2025-12-15 23:59:59', 'ACTIVE', 'AMOUNT', 1500000.00, 1500000.00),
    ('FALL2025', 20.0, 'Giảm 20% cho đơn hàng mùa thu', 150, '2025-11-30 23:59:59', 'ACTIVE', 'PERCENTAGE', 600000.00, 150000.00),
    ('FLASH200K', 200000.00, 'Giảm 200K cho flash sale', 30, '2025-07-15 23:59:59', 'ACTIVE', 'AMOUNT', 1000000.00, 1000000.00),
    ('NEWUSER15', 15.0, 'Giảm 15% cho người dùng mới', 300, '2026-03-31 23:59:59', 'ACTIVE', 'PERCENTAGE', 400000.00, 80000.00),
    ('BLACKFRIDAY', 25.0, 'Giảm 25% cho Black Friday', 500, '2025-11-28 23:59:59', 'ACTIVE', 'PERCENTAGE', 800000.00, 200000.00),
    ('LOYAL50K', 50000.00, 'Giảm 50K cho khách hàng thân thiết', 100, '2025-12-31 23:59:59', 'ACTIVE', 'AMOUNT', 500000.00, 500000.00),
    ('EXPIRED2023', 10.0, 'Mã giảm giá đã hết hạn từ 2023', 20, '2023-12-31 23:59:59', 'INACTIVE', 'PERCENTAGE', 300000.00, 100000.00),
    ('WINTER300K', 300000.00, 'Giảm 300K cho mùa đông', 40, '2026-01-15 23:59:59', 'ACTIVE', 'AMOUNT', 1500000.00, 1500000.00),
    ('STUDENT5', 5.0, 'Giảm 5% cho học sinh, sinh viên', 200, '2025-09-30 23:59:59', 'ACTIVE', 'PERCENTAGE', 200000.00, 50000.00),
    ('DELETEDCODE', 12.0, 'Mã đã bị xóa', 10, '2025-06-30 23:59:59', 'DELETED', 'PERCENTAGE', 700000.00, 150000.00),
    ('PREMIUM100', 100000.00, 'Giảm 100K cho gói premium', 50, '2025-10-31 23:59:59', 'ACTIVE', 'AMOUNT', 1200000.00, 1200000.00);

INSERT INTO public.orders (order_id,discounted_price,total_price,coupon_id,created_date,user_id,note,status) VALUES
	 (21,1100000.00,1200000.00,4,'2025-05-30 19:48:59.492617',2,'Khách muốn giao buổi sáng','PENDING'),
	 (22,1800000.00,2000000.00,5,'2025-05-30 19:48:59.492617',2,'Giao hàng nhanh','CONFIRMED'),
	 (23,720000.00,800000.00,6,'2025-05-30 19:48:59.492617',2,'Khách nhận hàng tại cửa hàng','DELIVERED'),
	 (24,1500000.00,1500000.00,8,'2025-05-30 19:48:59.492617',2,'Khách đổi ý không mua','CANCELLED');

INSERT INTO public.order_items (price,quantity,order_id,product_id) VALUES
	 (300000.00,2,21,1),
	 (600000.00,1,21,2),
	 (300000.00,1,21,3),
	 (600000.00,2,22,2),
	 (800000.00,1,22,4),
	 (200000.00,1,22,5),
	 (300000.00,1,23,1),
	 (250000.00,2,23,3),
	 (900000.00,1,24,6),
	 (600000.00,1,24,2);

--select * from users u;
select * from coupons c;