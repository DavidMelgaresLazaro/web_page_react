import {
  sqliteTable,
  AnySQLiteColumn,
  check,
  integer,
  text,
  numeric,
  foreignKey,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

//* Table Users
export const users = sqliteTable(
  "users",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    email: text().notNull(),
    password: text().notNull(),
    role: text().default("user").notNull(),
    address: text().notNull(),
    createdAt: numeric("created_at")
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
    modifiedAt: numeric("modified_at")
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
  },
  (table) => {
    return {
      usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
      ordersCheck2: check(
        "orders_check_2",
        sql`status IN ('pending', 'processing', 'shipped', 'delivered'`
      ),
    };
  }
);

//* Table Categories
export const categories = sqliteTable(
  "categories",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
  },
  (table) => {
    return {
      usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
      ordersCheck2: check(
        "orders_check_2",
        sql`status IN ('pending', 'processing', 'shipped', 'delivered'`
      ),
    };
  }
);

//* Table Products
export const products = sqliteTable(
  "products",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    description: text().notNull(),
    categoryId: integer("category_id").references(() => categories.id),
    price: numeric().notNull(),
    stock: integer().notNull(),
    imageUrl: text("image_url").notNull(),
  },
  (table) => {
    return {
      usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
      ordersCheck2: check(
        "orders_check_2",
        sql`status IN ('pending', 'processing', 'shipped', 'delivered'`
      ),
    };
  }
);

//* Table Carts
export const cart = sqliteTable(
  "cart",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(() => users.id),
    total: integer().notNull(),
    date: numeric()
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
  },
  (table) => {
    return {
      usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
      ordersCheck2: check(
        "orders_check_2",
        sql`status IN ('pending', 'processing', 'shipped', 'delivered'`
      ),
    };
  }
);

//* Table Cart Items
export const cartItems = sqliteTable(
  "cart_items",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    cartId: integer("cart_id").references(() => cart.id),
    quantity: integer().notNull(),
  },
  (table) => {
    return {
      usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
      ordersCheck2: check(
        "orders_check_2",
        sql`status IN ('pending', 'processing', 'shipped', 'delivered'`
      ),
    };
  }
);

//* Table Orders
export const orders = sqliteTable(
  "orders",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(() => users.id),
    date: numeric()
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
    status: text().default("pending"),
    totalAmount: integer("total_amount").notNull(),
  },
  (table) => {
    return {
      usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
      ordersCheck2: check(
        "orders_check_2",
        sql`status IN ('pending', 'processing', 'shipped', 'delivered'`
      ),
    };
  }
);

//* Table Order Items
export const orderItems = sqliteTable(
  "order_items",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    orderId: integer("order_id").references(() => orders.id),
    productId: integer("product_id").references(() => products.id),
    quantity: integer().notNull(),
    unitPrice: integer("unit_price").notNull(),
  },
  (table) => {
    return {
      usersCheck1: check("users_check_1", sql`role IN ('admin', 'user'`),
      ordersCheck2: check(
        "orders_check_2",
        sql`status IN ('pending', 'processing', 'shipped', 'delivered'`
      ),
    };
  }
);
