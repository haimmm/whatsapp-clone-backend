import { NextFunction, Request, Response } from "express";

export type dataType = object | string | undefined;
export type responseType = {
  data: dataType;
  status: number;
};
type cbType = (req: Request) => Promise<responseType | dataType>;

/*
    3 shapes of responses are allowed:
    1. object which contains data & status fields
    2. dataType (status 200 sent)
    3. undifined ({data:"sucess"} & response 200 sent)   
*/
export const asyncRouteWrapper = (cb: cbType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await cb(req);
      const data =
        results === undefined
          ? "success"
          : (results as responseType).data
          ? (results as responseType).data
          : results;
      const status = (results as responseType).status
        ? (results as responseType).status
        : 200;
      console.log("[route wrapper]: sending this data: ", data);
      res.status(status).send({ data });
    } catch (error) {
      next(error);
    }
  };
};
