import { ZodError } from "zod";

//* Define a custom error class ObjectValidationError that extends the built-in Error class
class ObjectValidationError extends Error {
  statusCode = 400;
  errors: {
    [x: string]: string[] | undefined;
    [x: number]: string[] | undefined;
    [x: symbol]: string[] | undefined;
  };

  constructor(error: ZodError) {
    super("Validation Error");
    this.errors = this.flattenErrors(error);
  }

  flattenErrors(error: ZodError) {
    return error.flatten().fieldErrors;
  }
}

export default ObjectValidationError;
