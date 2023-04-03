import { Secret, sign, verify, JwtPayload } from "jsonwebtoken";

type DataType = {
  userId: number;
  refresh?: true;
};

const secret: Secret = process.env.JWT_KEY || "";

export function createNewToken(payload: DataType, maxAge: number) {
  return "bearer " + sign(payload, secret, { expiresIn: maxAge });
}

export function verifyToken(token: string): Promise<JwtPayload | string> {
  return new Promise((res, rej) => {
    try {
      const decoded = verify(token, secret);
      res(decoded);
    } catch (err) {
      rej(err);
    }
  });
}

export function verifyPayload(
  payload: string | JwtPayload
): payload is JwtPayload {
  return (
    typeof payload !== "string" &&
    typeof payload.id === "number" &&
    typeof payload.userId === "string"
  );
}
