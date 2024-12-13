import { Request, Response } from "express";

export const registerOrder = async (req: Request, res: Response) => {
  const { total } = req.body;
  try {
    // Aquí se simula la creación de la orden en la base de datos
    // Puedes reemplazar esto con lógica real de base de datos.
    res.json({ success: true, message: "Orden registrada exitosamente" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default { registerOrder };
