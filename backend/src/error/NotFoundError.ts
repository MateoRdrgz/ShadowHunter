export class NotFoundError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = 404;
    this.name = "NotFoundError";
  }
}

export function notFound(message: string): never {
  throw new NotFoundError(message);
}