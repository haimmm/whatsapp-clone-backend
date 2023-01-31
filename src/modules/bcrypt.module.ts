import bcrypt from "bcrypt";

const saltRounds = 10;

const encrypt = (value: string) => bcrypt.hashSync(value, saltRounds);
const compare = (value: string, encryptedValue: string) =>
  bcrypt.compareSync(value, encryptedValue);

export default {
  encrypt,
  compare,
};
