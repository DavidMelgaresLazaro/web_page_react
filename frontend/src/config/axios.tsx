import axios from "axios";

import { Img, User } from "../config/types";

const instanceAxios = axios.create({
  baseURL: "http://localhost:4321",
  timeout: 50000,
});

export const getUsers = async () => {
  return await instanceAxios.get<User[]>("/users");
};
/* export const getImg = async () => {
    return await instanceAxios.get<Img[]>("/games/img")
    
    } */
export const getOneImg = async () => {
  try {
    const response = await instanceAxios.get<Img[]>("/products/getProducts");
    console.log(response);
    // Asumimos que la propiedad de la URL es 'url' y que estamos obteniendo la primera imagen.
    // Si tienes varios productos, puedes cambiar este comportamiento a lo que necesites.
    return response.data[0]?.url || "url_de_imagen_por_defecto"; // Retorna la URL de la primera imagen o una URL por defecto.
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
    return "url_de_imagen_por_defecto"; // En caso de error, retorna una imagen por defecto
  }
};

export const getAllImg = async () => {
  try {
    const response = await instanceAxios.get<Img[]>(
      "http://localhost:3000/products"
    );
    console.log(response); // Verifica la respuesta de la API en la consola
    return response.data; // Retorna todas las imágenes (no solo la primera)
  } catch (error) {
    console.error("Error al obtener las imágenes:", error);
    return []; // En caso de error, retorna un arreglo vacío
  }
};
