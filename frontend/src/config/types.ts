type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  validationCode?: string;
  isValidated?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};
type Img = {
  name: string;
  id: number;
  publicId: string;
  url: string;
  price: number;
  productId: number;
  createdAt?: Date;
};

type ProductoInCart = Img & {
  cantidad: number;
};

type Carrito = ProductoInCart[];

type UserForm = Pick<User, "name" | "email" | "password">;

export type { User, Img, Carrito, ProductoInCart, UserForm };
