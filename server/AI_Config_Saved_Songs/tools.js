import OpenAI from "openai"
import { openai, supabase } from "./config.js"
import dotenv from "dotenv"
import { useState } from "react"

dotenv.config()


// const [songs, setSongs] = useState([])

export async function getEmbedding(arr){
    const resolved = await Promise.all(
        arr.map(async (song, index) =>{
            console.log("Song", song)
            const response = await openai.embeddings.create({
                model: 'text-embedding-3-small',
                input: song
            })

            return { embedding: response.data[0].embedding }
        })
    )
    // console.log("Resolved", resolved)
    return resolved
}

export async function matchEmbeddingToDB( {songs, matchThreshold=0.75, matchCount=5} ) {
    const theEmbedding = await getEmbedding(songs)
    // console.log(theEmbedding)

    const results = []


    //THE PROBLEM IS THIS TRY BLOCK NOTHING IS RETURNING AND BEING UPLOADED TO RESULTS

    try{
        for(const embeddingObj of theEmbedding){
            // console.log("The embeddingObj", embeddingObj.embedding)
            const { data, error } = await supabase.rpc("match_songs", {
                query_embedding: embeddingObj.embedding,
                match_threshold: matchThreshold,
                match_count: matchCount
            })
            if(error){
                console.log("Error in awaiting rpc", error)
            }else{
                console.log(data)
            }
            results.push(data)
        }
        console.log("Results array populated")
    }catch(err){
        console.log("Could not use match_songs function for array of songs")
    }
    console.log("Here are the results", results)
    return results
}

export async function findMatch({songs, matchThreshold=0.75, matchCount=5}){
    const getEmbeddings = await matchEmbeddingToDB({songs, matchThreshold, matchCount})
    return getEmbeddings
}

export const tools = [
    {
        type: "function",
        function: {
            name: "findMatch",
            description: "Retrieves songs based on the vector embedding of the user's input. These songs will give the most closely correlated songs to the users preferences/desires.",
            parameters: {
                type: "object",
                properties: {
                    songs:{
                        type: "array", 
                        description: "Array of songs that the user likes",
                        items:{
                            type: "string"
                        }
                    },
                    matchThreshold:{
                        type: "number", 
                        description: "Similarity Threshold (defauult: 0.75)"
                    },
                    matchCount: {
                        type: "number",
                        description: "Number of matches to return (default: 5)"
                    }
                }
            },
            required:["songs"]
        }
    }
]