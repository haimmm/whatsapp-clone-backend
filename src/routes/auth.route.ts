import Router from "express";
import { login, register } from "../controllers/auth.controller";
import { asyncRouteWrapper } from "../utils/asyncRouteWrapper";
import validator from "../middlewares/objectValidator";
import registerSchema from "../data models/auth/register.schema";

const router = Router();

router.post(
  "/register",
  validator(registerSchema),
  asyncRouteWrapper(register)
);

//router.post("/login", asyncRouteWrapper(login));

//TODO : WHEN WE INTEGRATE TOKENS
//router.post("/refresh");

export default router;
