import * as yup from "yup";
const UserValidation = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  name: yup.string().nullable().optional(),
  phoneNumber: yup.string().nullable().optional(),
});
const SessionValidation = yup.object().shape({
  access_token: yup.string().nullable().required("Access token is required"),
  refresh_token: yup.string().nullable().required("Refresh token is required"),
  userId: yup.string().nullable().required("User id is required"),
});
const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
})
const LogOutValidation = yup.object().shape({
  access_token: yup.string().nullable().required("Access token is required"),
});

export { UserValidation, SessionValidation, LoginValidation,LogOutValidation };
