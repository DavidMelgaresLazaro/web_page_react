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
export type { User };
