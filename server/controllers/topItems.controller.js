import axios from "axios"


export async function topItemsController(req, res){
    const key = req.session.access_token
    const type = "tracks"
    if(!key){
        console.log("Key is not available")
    }
    console.log("The key is available for topItemsController", key)
    try{
        const request = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
            headers: {
                Authorization: `Bearer ${key}`
            }
        })
        res.json(request)
    }catch(err){
        console.log("Could not make request to api")
        res.json("This is the error from the request", err)
    }
}