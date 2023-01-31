const userService = require("../services/user.service");
const serverError = require("../errorHandler/serverError");
const bcrypt = require("../utils/bcrypt");

const update = async (req) => {
  //expected: password, email, address (optional: google api), phone
  const user = await userService.getUser({ _id: "62b1c8a26b23a3af0db68c77" });
  if (!user) {
    throw new serverError("User not found", 404);
  }
  const { email, password } = req.body;
  if (password) {
    req.body.password = bcrypt.encrypt(password);
  }
  if (email) {
    const user = await userService.getUser({ email: email });
    if (user) {
      throw new serverError("This email is taken", 409);
    }
  }
  return await userService.updateUser(user._id, req.body);
};

module.exports = {
  update,
};
