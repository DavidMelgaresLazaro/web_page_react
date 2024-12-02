import { relations } from "drizzle-orm/relations";
import {
  categories,
  products,
  users,
  cart,
  cartItems,
  orders,
  orderItems,
} from "./schema";

export const productsRelations = relations(products, ({ one, many }) => ({
  // One-to-one relationship with the 'categories' table. A product belongs to a category.
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  orderItems: many(orderItems),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  // One-to-many relationship with the 'products' table. A category can have many products.
  products: many(products),
}));

export const cartRelations = relations(cart, ({ one, many }) => ({
  // One-to-one relationship with the 'users' table. A cart belongs to a user.
  user: one(users, {
    fields: [cart.userId],
    references: [users.id],
  }),
  // One-to-many relationship with the 'cartItems' table. A cart can have many cart items.
  cartItems: many(cartItems),
}));

export const usersRelations = relations(users, ({ many }) => ({
  // One-to-many relationship with the 'cart' table. A user can have multiple carts and the same with orders
  carts: many(cart),
  orders: many(orders),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  // One-to-one relationship with the 'cart' table. A cart item belongs to one cart.
  cart: one(cart, {
    fields: [cartItems.cartId],
    references: [cart.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  // One-to-one relationship with the 'users' table. An order belongs to a user.
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  // One-to-many relationship with the 'orderItems' table. An order can have many order items.
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  // One-to-one relationship with the 'products' table. An order item belongs to a product.
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
  // One-to-one relationship with the 'orders' table. An order item belongs to an order.
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));
