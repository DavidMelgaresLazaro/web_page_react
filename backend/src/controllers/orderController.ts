import { Request, Response } from "express";
import { db } from "../config/db/connection";
import { orderItems, orders } from "../config/db/schema";

export const registerOrder = async (req: Request, res: Response) => {
  const { total, userId, products } = req.body;
  try {
    // Aquí se simula la creación de la orden en la base de datos
    //* Creamos un nuevo order
    const [order] = await db
      .insert(orders)
      .values({
        userId: userId,
        totalAmount: total,
      })
      .returning({ orderId: orders.id });
    // Puedes reemplazar esto con lógica real de base de datos.

    //* Agregamos los productos a la orden
    for (const product of products) {
      await db.insert(orderItems).values({
        orderId: order.orderId,
        productId: product.id,
        quantity: product.cantidad,
        unitPrice: product.price,
      });
    }

    res.json({
      success: true,
      message: `Orden registrada exitosamente con id ${order.orderId}`,
      orderId: order.orderId,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default { registerOrder };
