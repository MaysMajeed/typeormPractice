import userController from "../contollers/user.controller";
import * as express from "express";
const router = express.Router();

router.get("/getTypeorm", userController.allUsers);
router.get("/signUp", userController.signUp);
router.get("/signIn", userController.signIn);

export default router;
