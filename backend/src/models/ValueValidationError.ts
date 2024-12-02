import { ZodError } from "zod";

//* Define a custom error class ValueValidationError that extends the built-in Error class
class ValueValidationError extends Error {
  statusCode = 400;
  errors: string[];

  constructor(error: ZodError) {
    super("Validation Error");
    this.errors = this.flattenErrors(error);
  }

  flattenErrors(error: ZodError) {
    return error.flatten().formErrors;
  }
}

export default ValueValidationError;
