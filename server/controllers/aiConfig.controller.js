import { openai, supabase } from "../config.js"


const songs = []

export async function dataTransfer(req, res){
    songs.push(req.body)
    try{
        const data = await Promise.all(
            songs.map(async(song) =>{
                console.log("HEllo1")
                const value = song.mostPlayed
                console.log(value)
                console.log("HEres the song", value)
                const embeddingResponse = await openai.embeddings.create({
                    model: 'text-embedding-3-large',
                    input: value,
                    encoding_format: "float"
                })
                console.log("Embedding", embeddingResponse)

                return {name: value, embedding: embeddingResponse.data[0].embedding}
            })
        )

        console.log(data)
        await supabase.from("music").insert(data)
    }catch(err){
        console.log("Error in creating embeddings", err)
    }
    res.json({message: "success"})
}
