import { Router } from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/sign-up', signup)

authRouter.post('/sign-in', signin)

authRouter.post('/sign-out', signout)

export default authRouter;