const { find, add, update } = require("./mongodb.service");

const getUser = async (query) => {
  const userFromDB = await find("user", query);
  console.log(userFromDB);
  return userFromDB[0];
};

const getUsers = async () => {
  const userFromDB = await find("user");
  console.log(userFromDB);
  return userFromDB[0];
};

const addUser = async (user) => {
  const addedUser = await add("user", user);
  return await addedUser;
};

const updateUser = async (_id, updates) => {
  return await update("user", { _id }, { $set: updates });
};

module.exports = {
  getUser,
  getUsers,
  addUser,
  updateUser,
};
