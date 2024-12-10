import { Request, RequestHandler, Response } from "express";
import { productImages, products, users } from "../config/db/schema.js";
import { and, eq, sql } from "drizzle-orm";
import { db } from "../config/db/connection";

async function getProducts(req: Request, res: Response) {
  try {
    const GameImages = await db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        price: products.price,
        stock: products.stock,
        url: productImages.url,
      })
      .from(products)
      .leftJoin(productImages, sql`${products.id} = ${productImages.productId}`)
      .orderBy(sql`RANDOM()`)
      .limit(3);

    res.send(GameImages);
  } catch (error) {
    console.error("Error fetching products with images:", error);
    res.status(500).send({ error: "Failed to fetch products" });
  }
}

async function getAllGames(req: Request, res: Response) {
  try {
    const allGames = await db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        price: products.price,
        stock: products.stock,
        url: productImages.url,
      })
      .from(products)
      .leftJoin(
        productImages,
        sql`${products.id} = ${productImages.productId}`
      );
    res.send(allGames);
  } catch (error) {
    console.error("Error fetching products with images:", error);
    res.status(500).send({ error: "Failed to fetch products" });
  }
}
async function getSoldGames(req: Request, res: Response) {
  try {
    const allGames = await db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        price: products.price,
        stock: products.stock,
        url: productImages.url,
      })
      .from(products)
      .leftJoin(productImages, sql`${products.id} = ${productImages.productId}`)
      .limit(8);
    res.send(allGames);
  } catch (error) {
    console.error("Error fetching products with images:", error);
    res.status(500).send({ error: "Failed to fetch products" });
  }
}

export { getAllGames, getProducts, getSoldGames };
