import express from "express";
import {SignIn ,SignUp,SignUpPost,SignInPost,LogOut} from "../Controllers/userController.js";
const router = express.Router();



 router.get(`/signin`,SignIn)
 router.get(`/signup`,SignUp);
 router.post(`/signup`,SignUpPost)
 router.post( `/Signin`,SignInPost)
 router.get(`/logout`,LogOut)

export default router;