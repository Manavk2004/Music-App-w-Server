import express from "express"
import { responseController } from "../controllers/response.controller.js"


export const responseRouter = express.Router()

responseRouter.post("", responseController)