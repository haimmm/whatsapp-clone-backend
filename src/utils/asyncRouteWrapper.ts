import { NextFunction, Request, Response } from "express";

export type ResponseDataType = object | string | undefined;
export type ResponseType = {
  data: ResponseDataType;
  status: number;
};
type cbType = (
  req: Request,
  res?: Response
) => Promise<ResponseType | ResponseDataType | void>;

/*
    3 shapes of responses are allowed:
      1. ResponseType object
      2. ResponseDataType (status 200 auto assigned)
      3. undifined ({data:"sucess"} & status 200 sent)   
*/
export const asyncRouteWrapper = (cb: cbType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await cb(req, res);
      const data =
        results === undefined
          ? "success"
          : (results as ResponseType).data
          ? (results as ResponseType).data
          : results;
      const status = (results as ResponseType).status
        ? (results as ResponseType).status
        : 200;
      console.log("[route wrapper]: sending this data: ", data);
      res.status(status).send({ data });
    } catch (error) {
      next(error);
    }
  };
};
