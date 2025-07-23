import { openai, supabase } from "../config.js"
import { songCatalog } from "../models/songCatalog.js"


const songs = []

// export async function dataTransfer(req, res){
//     songs.push(req.body)
//     try{
//         const data = await Promise.all(
//             songs.map(async(song) =>{
//                 const value = song.mostPlayed
//                 const embeddingResponse = await openai.embeddings.create({
//                     model: 'text-embedding-3-large',
//                     input: value,
//                     encoding_format: "float"
//                 })
//                 console.log("Embedding", embeddingResponse)

//                 return {name: value, embedding: embeddingResponse.data[0].embedding}
//             })
//         )

//         console.log(data)
//         await supabase.from("music").insert(data)
//     }catch(err){
//         console.log("Error in creating embeddings", err)
//     }
//     res.json({message: "success"})
// }

export async function songTransfer(req, res){
    try{
        const data = await Promise.all(
            songCatalog.map(async(theSong)=>{
                const embeddingResponse = await openai.embeddings.create({
                    model: 'text-embedding-3-large',
                    input: theSong,
                    encoding_format: "float"
                })
                console.log("Embedding", embeddingResponse)
                return {song: theSong, query_embedding: embeddingResponse.data[0].embedding}
            })
        )
        await supabase.from("songs").insert(data)
        console.log("Success")
    }catch(err){
        console.log("Error in creating son embeddings", err)
    }
    res.json({message: "Success"})
}
