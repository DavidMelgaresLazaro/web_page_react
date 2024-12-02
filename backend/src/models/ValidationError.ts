import { ZodError } from "zod";
import { generateErrorMessage } from "zod-error";

//* Define a custom error class ValidationError that extends the built-in Error class
class ValidationError extends Error {
  statusCode = 400;
  errors: string;

  constructor(error: ZodError) {
    super("Validation Error");
    this.errors = this.stringifyErrors(error);
  }

  stringifyErrors(error: ZodError) {
    const errorString = generateErrorMessage(error.issues, {
      code: {
        enabled: false,
      },
      path: {
        enabled: true,
        transform: ({ value }) => (value ? value : ""),
        type: "breadcrumbs",
      },
      message: {
        enabled: true,
        transform: ({ value }) => (value ? value : ""),
      },

      delimiter: {
        component: "",
        error: "\n",
      },

      transform: ({ index, pathComponent, messageComponent }) => {
        const pathMessage = pathComponent ? ` at ${pathComponent}` : "";
        return `Error ${index + 1}${pathMessage}: ${messageComponent}`;
      },
    });
    return errorString;
  }
}

export default ValidationError;
