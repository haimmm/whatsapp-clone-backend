import { NextFunction, Request, Response } from "express";

export class ServerError extends Error {
  readonly code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export const errorHandler = (
  err: ServerError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ServerError) {
    console.error("[ServerError] ", err);
    res.status(err.code).send({ error: err.message });
  } else {
    console.error("[unknown error] ", err);
    res.status(500).send({ error: "Unexpected server error accurd..." });
  }
};
