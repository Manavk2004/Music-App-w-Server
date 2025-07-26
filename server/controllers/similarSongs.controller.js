import { openai, supabase } from "../AI_Config_Saved_Songs/config.js"


export async function similarSongsController(req, res){
    try{
        const body = req.body
        console.log("Sent body", body)
        res.json("Got it")
    }catch(err){
        console.log("Did not get the array of saved songs", err)
    }
}