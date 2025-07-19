import express from "express"
import { login } from "../controllers/login.controller.js"

export const loginRouter = express.Router()


loginRouter.get("", login)