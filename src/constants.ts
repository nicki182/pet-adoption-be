const publicRoutes =process.env.NODE_ENV ==='production'? [
  "/auth/login",
  "/auth/logout",
  "/auth/signup",
  "/auth/refresh_token",
  "/animals/petList",
]:
[
  "/auth/login",
  "/auth/logout",
  "/auth/signup",
  "/auth/refresh_token",
  "/animals/petList",
  "/graphql"
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
