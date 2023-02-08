import { Request, Response } from "express";

const defaultErrorMessage = "Unexpected server error accurd...";
const defaultErrorStatus = 500;

type ErrorType = {
  source: string;
  details?: unknown;
  code?: number;
  message?: string;
};

export class ServerError extends Error {
  readonly source: string;
  readonly details: unknown;
  readonly code: number;

  constructor({ source, details, code, message }: ErrorType) {
    super(message || defaultErrorMessage);
    this.source = source;
    this.details = details;
    this.code = code || defaultErrorStatus;
  }
}

export const errorHandler = (
  err: ServerError | Error,
  req: Request,
  res: Response
) => {
  if (err instanceof ServerError) {
    console.error(`[${err.source} ] `, err.details || err.message);
    res.status(err.code).send({ error: err.message });
  } else {
    console.error("[unknown error] ", err);
    res.status(defaultErrorStatus).send({ error: defaultErrorMessage });
  }
};
