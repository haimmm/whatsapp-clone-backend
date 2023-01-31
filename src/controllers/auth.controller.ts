import { Request } from "express";
import { getUserBy, addUser } from "../services/user.service";
import { ServerError } from "../middlewares/errorHandler";
import bcrypt from "../modules/bcrypt.module";
import statusCodes from "../utils/httpStatusCodes";
import { dataType, responseType } from "../utils/asyncRouteWrapper";

export const register = async (
  req: Request
): Promise<responseType | dataType> => {
  const { email } = req.body;
  const isUserExists = await getUserBy("email", email);

  if (isUserExists) {
    throw new ServerError("This email is taken", statusCodes.CONFLICT);
  }

  req.body.email = email.toLowerCase();
  req.body.password = bcrypt.encrypt(req.body.password);
  await addUser(req.body);
  return {
    data: "success",
    status: 201,
  };
};

export const login = async (req: Request): Promise<responseType | dataType> => {
  const user = await getUserBy("email", req.body.email);
  if (!user || !bcrypt.compare(req.body.password, user.password)) {
    throw new ServerError("Wrong email or password", statusCodes.FORBIDDEN);
  }
  //delete user.password;
  const { password, ...noPasswordUser } = user;
  console.log("user Logged in ! ", user);
  return noPasswordUser;
};
