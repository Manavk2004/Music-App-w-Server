import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { loginRouter } from "./routes/login.router.js"
import { callBackRouter } from "./routes/callback.router.js"
import { artistRouter } from "./routes/artist.router.js"
import { recentlyPlayedRouter } from "./routes/recentlyPlayed.router.js"
import { randomImage } from "./routes/randomImage.router.js"
import session from "express-session"
import { AgentActionOutputParser } from "langchain/agents"


dotenv.config()



const app = express()
app.use(cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true
}))

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
)
app.use(express.json())
const PORT = 3001

app.use("/random-image", randomImage)
app.use("/login", loginRouter)
app.use("/callback", callBackRouter)
app.use("/artist", artistRouter)
app.use("/recently-played", recentlyPlayedRouter)



app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})