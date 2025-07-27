import OpenAI from "openai"
import { openai, supabase } from "./config.js"
import dotenv from "dotenv"
import { useState } from "react"

dotenv.config()


// const [songs, setSongs] = useState([])

export async function getEmbedding(arr){
    const embeddings = []
    const resolved = await Promise.all(
        arr.map(async (song, index) =>{
            console.log("Getting embedding for", song)
            const response = await openai.embeddings.create({
                model: 'text-embedding-3-large',
                input: song
            })
            console.log(`Embedding for ${song}`, response)

            embeddings.push({ embedding: response.data[0].embedding })
        })
    )
    console.log("📊Embeddings", embeddings)
    return embeddings
}

export async function matchEmbeddingToDB( {songs, matchThreshold=0.5, matchCount=1} ) {
    console.log("🎶The songs form matchEmbedding function", songs)
    const theEmbedding = await getEmbedding(songs)
    console.log("The length of embedding💡", theEmbedding.length)

    const results = []


    //THE PROBLEM IS THIS TRY BLOCK NOTHING IS RETURNING AND BEING UPLOADED TO RESULTS

    try{
        for(const embeddingObj of theEmbedding){
            console.log("📈For loop inside databse matchEmbeddingToDB")
            // console.log("The embeddingObj", embeddingObj.embedding)
            const { data, error } = await supabase.rpc("match_songs", {
                query_embedding: embeddingObj.embedding,
                match_threshold: matchThreshold,
                match_count: matchCount
            })
            if(data.length != 0){
                results.push(data)
            }else{
                console.log("❌There is no Data")
            }

            // console.log("The data", data)
            if(error){
                console.log("Error in awaiting rpc", error)
            }console.log("Data successful", data[0].content)
        }
            
        }catch(err){
            console.log("Could not use match_songs function for array of songs")
        }
    // console.log("Here are the results", results)
    // console.log("Result Type:", typeof results)
    console.log("Result Length", results?.length)
    // console.log("💀",results) //Results are all francies mercier
    return results.flat()
}

export async function findMatch({songs, matchThreshold=0.5, matchCount=1}){
    console.log("🤼Inside findMatch function")
    console.log("🤣The songs inside findMatch", songs)
    const getEmbeddings = await matchEmbeddingToDB({songs, matchThreshold, matchCount})
    console.log("FInished getEmbeddings Function")
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