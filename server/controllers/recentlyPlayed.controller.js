import axios from "axios"

export async function recentlyPlayed(req, res){
    const key = req.session.access_token
    console.log("The Key", key)

    try{
        const response = await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
            headers: {
                Authorization: `Bearer ${key}`
            }
        })
        console.log("Successfully fetched recently played tracks")
        res.json(response.data.items)

    }catch(err){
        console.log("Could not make proper request")
        res.send(err)
    }   

}