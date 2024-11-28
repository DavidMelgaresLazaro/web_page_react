-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	`address` text NOT NULL,
	`created_at` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`modified_at` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	CONSTRAINT "users_check_1" CHECK(role IN ('admin', 'user'),
	CONSTRAINT "orders_check_2" CHECK(status IN ('pending', 'processing', 'shipped', 'delivered')
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	CONSTRAINT "users_check_1" CHECK(role IN ('admin', 'user'),
	CONSTRAINT "orders_check_2" CHECK(status IN ('pending', 'processing', 'shipped', 'delivered')
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`category_id` integer,
	`price` numeric NOT NULL,
	`stock` integer NOT NULL,
	`image_url` text NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "users_check_1" CHECK(role IN ('admin', 'user'),
	CONSTRAINT "orders_check_2" CHECK(status IN ('pending', 'processing', 'shipped', 'delivered')
);
--> statement-breakpoint
CREATE TABLE `cart` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer,
	`total` integer NOT NULL,
	`date` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "users_check_1" CHECK(role IN ('admin', 'user'),
	CONSTRAINT "orders_check_2" CHECK(status IN ('pending', 'processing', 'shipped', 'delivered')
);
--> statement-breakpoint
CREATE TABLE `cart_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`cart_id` integer,
	`quantity` integer NOT NULL,
	FOREIGN KEY (`cart_id`) REFERENCES `cart`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "users_check_1" CHECK(role IN ('admin', 'user'),
	CONSTRAINT "orders_check_2" CHECK(status IN ('pending', 'processing', 'shipped', 'delivered')
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer,
	`date` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`status` text DEFAULT 'pending',
	`total_amount` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "users_check_1" CHECK(role IN ('admin', 'user'),
	CONSTRAINT "orders_check_2" CHECK(status IN ('pending', 'processing', 'shipped', 'delivered')
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`order_id` integer,
	`product_id` integer,
	`quantity` integer NOT NULL,
	`unit_price` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "users_check_1" CHECK(role IN ('admin', 'user'),
	CONSTRAINT "orders_check_2" CHECK(status IN ('pending', 'processing', 'shipped', 'delivered')
);

*/