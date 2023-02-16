import { JSONSchemaType } from "ajv";
import { NextFunction, Request, Response } from "express";
import ajv from "../modules/ajv.module";
import { ServerError } from "./errorHandler";

const validator = <T>(schema: JSONSchemaType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validator = ajv.compile(schema);
    const valid = validator(req.body);

    if (valid) {
      next();
    } else {
      next(new ServerError({ details: validator.errors }));
    }
  };
};

export default validator;
