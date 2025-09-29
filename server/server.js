import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { loginRouter } from "./routes/login.router.js"
import { callBackRouter } from "./routes/callback.router.js"
import { artistRouter } from "./routes/artist.router.js"
import { recentlyPlayedRouter } from "./routes/recentlyPlayed.router.js"
import { topItemsRouter } from "./routes/topItems.router.js"
import { aiConfigRouter } from "./routes/aiConfig.router.js"
import { responseRouter } from "./routes/response.router.js"
import { topArtistsRouter } from "./routes/topArtists.router.js"
import { savedTracksRouter } from "./routes/savedTracks.router.js"
import { similarSongsRouter } from "./routes/similarSongs.router.js"
import { similarImagesRouter } from "./routes/similarImages.router.js"
import session from "express-session"
import { AgentActionOutputParser } from "langchain/agents"


dotenv.config()



const app = express()
app.use(cors({
    origin: "https://musai.onrender.com",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization']
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
const PORT = process.env.PORT || 4000

// app.use("/random-image", randomImage)
app.use("/get-top-items", topItemsRouter)
app.use("/login", loginRouter)
app.use("/callback", callBackRouter)
app.use("/artist", artistRouter)
app.use("/recently-played", recentlyPlayedRouter)
app.use("/aiconfig", aiConfigRouter)
app.use("/response", responseRouter)
app.use("/top-artists", topArtistsRouter)
app.use("/saved", savedTracksRouter)
app.use("/similar-songs", similarSongsRouter)
app.use("/similar-images", similarImagesRouter)



app.listen(PORT, '0.0.0.0', () =>{
    console.log(`Listening on port ${PORT}`)
})