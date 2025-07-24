import axios from "axios"
import { agent } from "../AI_Config/index.js"

export async function responseController(req, res){
    try{
        const body = req.body
        if(!body){
            console.log("Theres no body")
        }else{
            console.log("Body successfully captured", body.content)
        }
        const aiResponse = await agent(req.body.content)
        console.log(aiResponse)
        console.log("Success with AI")
        res.json(aiResponse)
    }catch(err){
        console.log("Could nto fetch AI", err)
    }
}