import { sqliteTable, AnySQLiteColumn, foreignKey, check, integer, text, numeric } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const productImages = sqliteTable("product_images", {
	id: integer().primaryKey({ autoIncrement: true }),
	publicId: text("public_id").notNull(),
	url: text().notNull(),
	productId: integer("product_id").references(() => products.id),
	createdAt: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
(table) => {
	return {
		usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
		ordersCheck2: check("orders_check_2", sql`status IN ('pending', 'processing', 'shipped', 'delivered'`),
	}
});

export const users = sqliteTable("users", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	role: text().default("user").notNull(),
	address: text(),
	createdAt: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	modifiedAt: numeric("modified_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	isDeleted: numeric("is_deleted").notNull(),
	deletedAt: text("deleted_at").default("sql`(NULL)`"),
},
(table) => {
	return {
		usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
		ordersCheck2: check("orders_check_2", sql`status IN ('pending', 'processing', 'shipped', 'delivered'`),
	}
});

export const categories = sqliteTable("categories", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
},
(table) => {
	return {
		usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
		ordersCheck2: check("orders_check_2", sql`status IN ('pending', 'processing', 'shipped', 'delivered'`),
	}
});

export const consoles = sqliteTable("consoles", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
},
(table) => {
	return {
		usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
		ordersCheck2: check("orders_check_2", sql`status IN ('pending', 'processing', 'shipped', 'delivered'`),
	}
});

export const products = sqliteTable("products", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	description: text().notNull(),
	categoryId: integer("category_id").references(() => categories.id),
	price: numeric().notNull(),
	stock: integer().notNull(),
},
(table) => {
	return {
		usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
		ordersCheck2: check("orders_check_2", sql`status IN ('pending', 'processing', 'shipped', 'delivered'`),
	}
});

export const productRelationConsoles = sqliteTable("product_relation_consoles", {
	id: integer().primaryKey({ autoIncrement: true }),
	productId: integer("product_id").references(() => products.id),
	consoleId: integer("console_id").references(() => consoles.id),
},
(table) => {
	return {
		usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
		ordersCheck2: check("orders_check_2", sql`status IN ('pending', 'processing', 'shipped', 'delivered'`),
	}
});

export const cart = sqliteTable("cart", {
	id: integer().primaryKey({ autoIncrement: true }),
	userId: integer("user_id").references(() => users.id),
	total: integer().notNull(),
	date: numeric().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
(table) => {
	return {
		usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
		ordersCheck2: check("orders_check_2", sql`status IN ('pending', 'processing', 'shipped', 'delivered'`),
	}
});

export const cartItems = sqliteTable("cart_items", {
	id: integer().primaryKey({ autoIncrement: true }),
	cartId: integer("cart_id").references(() => cart.id),
	quantity: integer().notNull(),
},
(table) => {
	return {
		usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
		ordersCheck2: check("orders_check_2", sql`status IN ('pending', 'processing', 'shipped', 'delivered'`),
	}
});

export const orderItems = sqliteTable("order_items", {
	id: integer().primaryKey({ autoIncrement: true }),
	orderId: integer("order_id").references(() => orders.id),
	productId: integer("product_id").references(() => products.id),
	quantity: integer().notNull(),
	unitPrice: integer("unit_price").notNull(),
},
(table) => {
	return {
		usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
		ordersCheck2: check("orders_check_2", sql`status IN ('pending', 'processing', 'shipped', 'delivered'`),
	}
});

export const orders = sqliteTable("orders", {
	id: integer().primaryKey({ autoIncrement: true }),
	userId: integer("user_id").references(() => users.id),
	date: numeric().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	status: text().default("pending"),
	totalAmount: integer("total_amount").notNull(),
},
(table) => {
	return {
		usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
		ordersCheck2: check("orders_check_2", sql`status IN ('pending', 'processing', 'shipped', 'delivered'`),
	}
});

