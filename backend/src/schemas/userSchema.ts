import { z } from "zod";

//* Defining a schema to validate an ID, ensuring it is a number
const IdSchema = z.coerce.number({
  invalid_type_error: "The ID must be a number",
});

//* Defining a schema for adding a user, which requires the name, email, and password fields
const AddUserSchema = z.object({
  name: z.string().min(1, "Name required").max(50, "Max 50 characters"),
  email: z
    .string()
    .email("Invalid email")
    .min(1, "Email required")
    .max(150, "Max 150 characters"),
  password: z.string().min(1, "Password required").max(16, "Max 16 characters"),
  address: z.string().min(1, "Address required").max(100, "Max 100 characters"),
});

//* Defining a schema for login, which only requires the email and password fields
const LoginSchema = AddUserSchema.pick({
  email: true,
  password: true,
});

export { IdSchema, AddUserSchema, LoginSchema };
