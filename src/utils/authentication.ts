import jwt from "jsonwebtoken";
const generateToken = (userId: string) => {
  const secret: string = process.env.JWT_KEY as string;
  return jwt.sign({ userId }, secret);
};
const verifyToken = (token: string) => {
  const secret: string = process.env.JWT_KEY as string;
  return jwt.verify(token, secret);
};
export { generateToken, verifyToken };
