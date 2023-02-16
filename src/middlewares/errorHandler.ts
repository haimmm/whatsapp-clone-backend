import { NextFunction, Request, Response } from "express";

const defaultErrorMessage = "Unexpected server error accurd...";
const defaultErrorStatus = 500;

type ErrorType = {
  details?: unknown;
  code?: number;
  message?: string;
};

export class ServerError extends Error {
  readonly details: unknown;
  readonly code: number;

  constructor({ details, code, message }: ErrorType) {
    super(message || defaultErrorMessage);
    this.code = code || defaultErrorStatus;
    this.details = details || "";
  }
}

export const errorHandler = (
  err: ServerError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ServerError) {
    console.error("[ ServerError ] ", err);
    res.status(err.code).send({ error: err.message });
  } else {
    console.error("[unknown error] ", err);
    res.status(defaultErrorStatus).send({ error: defaultErrorMessage });
  }
};
