import { Router } from "express";
import validator from "../validator";
import { LoginValidation, LogOutValidation, SessionValidation, UserValidation  } from "./validations";
import SesssionController from "@session/controller";
import sendData from "..";
const router = Router();
router.post("/login",validator(LoginValidation),async (req, res) => {
  const { email, password } = req.body;
      sendData(res,await SesssionController.logInSession({email,password}));
});
router.post("/logout",validator(LogOutValidation),async (req, res) => {
  sendData(res,await SesssionController.logOutSession(req.body.userId));
})
router.post("/signup",validator(UserValidation),async (req, res) => {
  //res.send({data:"aca estoy"})
  const session = await SesssionController.signUpSession(req.body);
  sendData(res,session);
})
router.post("/refresh_token",validator(SessionValidation),async (req, res) => {
  sendData(res,await SesssionController.refreshAccessToken(req.body.userId,req.body.refreshToken));
})
export default router;