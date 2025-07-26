import { openai, supabase } from "../AI_Config_Saved_Songs/config.js"
import session from "express-session"
import { agent } from "../AI_Config_Saved_Songs/index.js"


export const songsForEmbedding = []

export async function similarSongsController(req, res){
    try{
        const body = req.body
        console.log(body.savedTracks)
        for(const song of body.savedTracks){
            songsForEmbedding.push(song)
        }
        const response = await agent(songsForEmbedding)
        console.log("The response fo similarSongsController", response)
        // console.log("songForEmbedding", songsForEmbedding)
        // console.log("Sent body", body.savedTracks)
        req.session.similar_tracks = body.savedTracks
        res.json("Got it")
    }catch(err){
        console.log("Did not get the array of saved songs", err)
    }
}
