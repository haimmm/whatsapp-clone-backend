import { Request, Response } from "express";
import { getUserBy, addUser } from "../services/user.service";
import { ServerError } from "../middlewares/errorHandler";
import bcrypt from "../modules/bcrypt.module";
import statusCodes from "../utils/httpStatusCodes";
import { ResponseDataType } from "../utils/asyncRouteWrapper";
import { createNewToken } from "../modules/jwt.module";
import { createNewCookie, addSession } from "../services/auth.service";

export const register = async (
  req: Request,
  res: Response | undefined
): Promise<void> => {
  const { email } = req.body;
  const isUserExists = await getUserBy("email", email);

  if (isUserExists) {
    throw new ServerError({
      message: "This email is taken",
      code: statusCodes.CONFLICT,
    });
  }

  const newUser = {
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: bcrypt.encrypt(req.body.password),
  };

  await addUser(newUser);
  console.log("new user registered: " + req.body.email);
  (res as Response).redirect(statusCodes.FOUND, "/auth/login"); //auto login after register
};

export const login = async (
  req: Request,
  res: Response | undefined
): Promise<ResponseDataType> => {
  const user = await getUserBy("email", req.body.email.toLowerCase());
  if (!user || !bcrypt.compare(req.body.password, user.password)) {
    throw new ServerError({
      message: "Wrong email or password",
      code: statusCodes.FORBIDDEN,
    });
  }

  const accessTokenMaxAge = parseInt(
    process.env.ACCESS_TOKEN_MAX_AGE as string
  );
  const refreshTokenMaxAge = parseInt(
    process.env.REFRESH_TOKEN_MAX_AGE as string
  );
  const access_token = createNewToken(
    { userId: user.id as number },
    accessTokenMaxAge
  );
  const refresh_token = createNewToken(
    { refresh: true, userId: user.id as number },
    refreshTokenMaxAge
  );

  createNewCookie(
    res as Response,
    "refresh_token",
    refresh_token,
    new Date(Date.now() + refreshTokenMaxAge * 1000)
  );

  addSession({
    access_token,
    refresh_token,
    user_id: user.id as number,
  });

  const { password, ...noPasswordUser } = user;
  console.log("New user Logged in ! ", noPasswordUser);
  return noPasswordUser;
};
