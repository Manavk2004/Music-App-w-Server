import express from "express"
import { similarSongsController } from "../controllers/similarSongs.controller.js"


export const similarSongsRouter = express.Router()

similarSongsRouter.post("", similarSongsController)