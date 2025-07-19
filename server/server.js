import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { loginRouter } from "./routes/login.router.js"
import { callBackRouter } from "./routes/callback.router.js"

dotenv.config()



const app = express()
app.use(cors())
app.use(express.json())
const PORT = 3001

app.use("/login", loginRouter)
app.use("/callback", callBackRouter)

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})