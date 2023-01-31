import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true, $data: true });

addFormats(ajv);

/**
 * password rules:
 * at least 1 uppercase
 * at least 1 lowercase
 * at least 1 number
 * 8-15 characters long
 */
ajv.addFormat("password", (value) => {
  const PASSWORD_RULES = ["[A-Z]", "[a-z]", "\\d", "^\\w{8,15}$"];
  for (const rule of PASSWORD_RULES) {
    if (!new RegExp(rule).test(value)) return false;
  }
  return true;
});

export default ajv;
