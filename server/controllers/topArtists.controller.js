import axios from "axios"


export async function topArtistsController(req, res){
    let accessToken = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.query.access_token) {
        accessToken = req.query.access_token;
    } else if (req.session && req.session.access_token) {
        accessToken = req.session.access_token;
    }
    
    try{
        const response = await axios.get("https://api.spotify.com/v1/me/top/artists/", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        res.json(response.data)
    }catch(err){
        console.log("Error in getting top artists", err)
        res.json("This is the error from the top artists request", err)
    }

}