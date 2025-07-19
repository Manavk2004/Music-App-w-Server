import express from "express"
import { artist } from "../controllers/artist.controller.js"


export const artistRouter = express.Router()
artistRouter.get("", artist)