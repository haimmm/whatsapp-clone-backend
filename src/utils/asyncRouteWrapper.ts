import { NextFunction, Request, Response } from "express";

export type DataType = object | string | undefined;
export type ResponseType = {
  data: DataType;
  status: number;
};
type cbType = (req: Request) => Promise<ResponseType | DataType>;

/*
    3 shapes of responses are allowed:
      1. ResponseType object
      2. DataType (status 200 auto assigned)
      3. undifined ({data:"sucess"} & status 200 sent)   
*/
export const asyncRouteWrapper = (cb: cbType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await cb(req);
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
