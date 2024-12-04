import { relations } from "drizzle-orm/relations";
import { products, productImages, categories, consoles, productRelationConsoles, users, cart, cartItems, orderItems, orders } from "./schema";

export const productImagesRelations = relations(productImages, ({one}) => ({
	product: one(products, {
		fields: [productImages.productId],
		references: [products.id]
	}),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	productImages: many(productImages),
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	}),
	productRelationConsoles: many(productRelationConsoles),
	orderItems: many(orderItems),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	products: many(products),
}));

export const productRelationConsolesRelations = relations(productRelationConsoles, ({one}) => ({
	console: one(consoles, {
		fields: [productRelationConsoles.consoleId],
		references: [consoles.id]
	}),
	product: one(products, {
		fields: [productRelationConsoles.productId],
		references: [products.id]
	}),
}));

export const consolesRelations = relations(consoles, ({many}) => ({
	productRelationConsoles: many(productRelationConsoles),
}));

export const cartRelations = relations(cart, ({one, many}) => ({
	user: one(users, {
		fields: [cart.userId],
		references: [users.id]
	}),
	cartItems: many(cartItems),
}));

export const usersRelations = relations(users, ({many}) => ({
	carts: many(cart),
	orders: many(orders),
}));

export const cartItemsRelations = relations(cartItems, ({one}) => ({
	cart: one(cart, {
		fields: [cartItems.cartId],
		references: [cart.id]
	}),
}));

export const orderItemsRelations = relations(orderItems, ({one}) => ({
	product: one(products, {
		fields: [orderItems.productId],
		references: [products.id]
	}),
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.id]
	}),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	orderItems: many(orderItems),
	user: one(users, {
		fields: [orders.userId],
		references: [users.id]
	}),
}));