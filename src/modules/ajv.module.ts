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
  const pattern = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*]{8,15}$";
  return new RegExp(pattern).test(value);
});

export default ajv;
