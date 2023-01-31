const userService = require("../services/user.service");
const serverError = require("../errorHandler/serverError");
const bcrypt = require("../utils/bcrypt");

const register = async (req) => {
  const { email } = req.body;
  //check if user exists in the db
  const isUserExists = await userService.getUser({ email: email });
  //consider to check with middleware
  if (isUserExists) {
    throw new serverError("This email is taken", 409);
  }

  req.body.email = email.toLowerCase();
  req.body.password = bcrypt.encrypt(req.body.password);
  return await userService.addUser(req.body);
};

const login = async (req) => {
  const { email, password } = req.body;

  const user = await userService.getUser({email:email});
  if (!user || !bcrypt.compare(password, user.password)) {
    throw new serverError("Wrong email or password", 403);
  }
  delete user.password;
  console.log("user Logged in ! ", user);
  return user;
};

module.exports = {
  register,
  login,
};
