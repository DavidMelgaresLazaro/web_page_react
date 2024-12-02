//* Define a custom error class HttpError that extends the built-in Error class

class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default HttpError;
