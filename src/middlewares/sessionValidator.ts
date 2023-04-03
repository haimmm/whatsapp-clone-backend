import { verifyToken, verifyPayload } from "../modules/jwt.module";
import { getSessionBy } from "../services/auth.service";
import { getUserBy } from "../services/user.service";
import { NextFunction, Request, Response } from "express";
import statusCodes from "../utils/httpStatusCodes";

/**
 *  --- validation flow ---
 * token existance in headers
 * token validation with JWT decrypt
 * data validation with type guard
 * session validation quering the session from db by it's id
 * the user id added to the request object
 **/

export async function tokenValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return next({
        message: "token not found",
        status: statusCodes.NOT_FOUND,
      });
    }

    const tokenData = await verifyToken(token);

    if (verifyPayload(tokenData)) {
      const session = await getSessionBy("id", tokenData.id);
      if (session) {
        req.userId = session.user_id;
        return next();
      }
    }
    return next({
      message: "Token is invalid",
      status: statusCodes.UNAUTHORIZED,
    });
  } catch (err) {
    return next({
      message: "token is invalid or expired",
      status: statusCodes.UNAUTHORIZED,
    });
  }
}
