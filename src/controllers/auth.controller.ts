import { Request } from "express";
import { getUserBy, addUser } from "../services/user.service";
import { ServerError } from "../middlewares/errorHandler";
import bcrypt from "../modules/bcrypt.module";
import statusCodes from "../utils/httpStatusCodes";
import { DataType, ResponseType } from "../utils/asyncRouteWrapper";

export const register = async (req: Request): Promise<ResponseType> => {
  const { email } = req.body;
  const isUserExists = await getUserBy("email", email);

  if (isUserExists) {
    throw new ServerError({
      message: "This email is taken",
      code: statusCodes.CONFLICT,
    });
  }

  req.body.email = email.toLowerCase();
  req.body.password = bcrypt.encrypt(req.body.password);
  await addUser(req.body);
  return {
    data: "success",
    status: statusCodes.CREATED,
  };
};

export const login = async (req: Request): Promise<DataType> => {
  const user = await getUserBy("email", req.body.email);
  if (!user || !bcrypt.compare(req.body.password, user.password)) {
    throw new ServerError({
      message: "Wrong email or password",
      code: statusCodes.FORBIDDEN,
    });
  }

  const { password, ...noPasswordUser } = user;
  console.log("user Logged in ! ", user);
  return noPasswordUser;
};
