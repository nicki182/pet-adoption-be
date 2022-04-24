import _ from "lodash";
import { publicRoutes, privateRoutes } from "@constants";
import ServerError from "@error/ServerError";
import { verifyToken } from "@utils/authentication";
const isPublic = (req) => {
  return publicRoutes.includes(req.path);
};
interface UserTokenPayload {
  userId: string;
}
const isAuthenticated = (req) => {
  //if('/favicon.ico' === req.path) return true;
  const token = req.headers.authorization;
  if (!token)
    throw new ServerError(undefined, {
      message: "Unauthorized User",
      status: 401,
    });
  if (!verifyToken(token))
    throw new ServerError(undefined, {
      message: "Unauthorized User",
      status: 401,
    });
  if (req.userId !== (verifyToken(token) as UserTokenPayload).userId)
    throw new ServerError(undefined, {
      message: "Unauthorized User",
      status: 401,
    });
  return true;
};

export const authenticate = (req, res, next) => {
  if (_.includes([...publicRoutes, ...privateRoutes], req.path)) {
    if (isPublic(req)) return next();
    if (isAuthenticated(req)) return next();
    return next(
      new ServerError(undefined, { message: "Unauthorized User", status: 401 })
    );
  }
  return next(new ServerError(404));
};
