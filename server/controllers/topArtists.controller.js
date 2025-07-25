import axios from "axios"


export async function topArtistsController(req, res){
    const key = req.session.access_token
    if(!key){
        console.log("Key is not available")
    }else{
        console.log("Key for topArtists", key)
    }
    try{
        const response = await axios.get("https://api.spotify.com/v1/me/top/artists/", {
            headers: {
                Authorization: `Bearer ${key}`
            }
        })
        res.json(response.data)
    }catch(err){
        console.log("Error in getting top artists", err)
        res.json("This is the error from the top artists request", err)
    }

}