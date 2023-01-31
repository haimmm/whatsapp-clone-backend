import { JSONSchemaType } from "ajv";
import { NextFunction, Request, Response } from "express";
import ajv from "../modules/ajv.module";

const validator = <T>(schema: JSONSchemaType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validator = ajv.compile(schema);
    const valid = validator(req.body);

    if (valid) {
      next();
    } else {
      throw new Error(validator.errors?.toString());
    }
  };
};

export default validator;
