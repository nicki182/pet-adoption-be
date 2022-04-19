import bcrypt from "bcrypt";
import jwt, { DecodeOptions } from "jsonwebtoken";
import { ObjectSchema } from "yup";
import { IValidationSchema } from "../interfaces";
import _ from "lodash";
const generateToken = (userId: string, expirationTime: number | string) => {
  const secret: string = process.env.JWT_KEY as string;
  return jwt.sign(
    {
      data: { userId },
    },
    secret,
    { expiresIn: expirationTime }
  );
};

const verifyToken = (token: string):jwt.JwtPayload | string=> {
  const secret: string = process.env.JWT_KEY as string;
  return jwt.verify(token, secret);
};
const decodeToken = (token: string, options?: DecodeOptions) => {
  return jwt.decode(token, options);
};
const hashPassword = (password: string) => {
  return bcrypt.hash(password, Number(process.env.SALT));
};

const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

async function validateSchema<
  T extends IValidationSchema,
  I extends Record<string, unknown>
>(schema: ObjectSchema<T>, data: I): Promise<{errors:unknown[],values:unknown}> {
  try {
    await schema.validate(data, { abortEarly: false });
    return { errors: [], values: data };
  } catch (error) {
    //TODO: Create a custom error with the error message and path of the error using error.inner
    return {
      errors: _.get(error, "errors", []),
      values: _.get(error, "values", {}),
    };
  }
}

export {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  validateSchema,
  decodeToken,
};
