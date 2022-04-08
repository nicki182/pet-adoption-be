import jwt from "jsonwebtoken";
const generateToken = (userId: string) => {
  const secret: string = process.env.JWT_KEY as string;
  return jwt.sign(
    {
      data: { userId },
    },
    secret,
    { expiresIn: Number(process.env.EXPIRATION_TIME) }
  );
};
const verifyToken = (token: string) => {
  const secret: string = process.env.JWT_KEY as string;
  return jwt.verify(token, secret);
};
export { generateToken, verifyToken };
