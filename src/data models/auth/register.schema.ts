import { JSONSchemaType } from "ajv";

interface registerSchema {
  name: string;
  email: string;
  password: string;
}

const schema: JSONSchemaType<registerSchema> = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    password: { type: "string", format: "password" },
  },
  additionalProperties: false,
  required: ["name", "email", "password"],
};

export default schema;
