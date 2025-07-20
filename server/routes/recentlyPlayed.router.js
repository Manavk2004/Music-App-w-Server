import express from "express"
import {recentlyPlayed} from "../controllers/recentlyPlayed.controller.js"


export const recentlyPlayedRouter = express.Router()

recentlyPlayedRouter.get("", recentlyPlayed)