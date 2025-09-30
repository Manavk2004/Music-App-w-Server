import axios from "axios"

export async function recentlyPlayed(req, res){
    let accessToken = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.query.access_token) {
        accessToken = req.query.access_token;
    } else if (req.session && req.session.access_token) {
        accessToken = req.session.access_token;
    }

    try{
        const response = await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log("Successfully fetched recently played tracks")
        res.json(response.data.items)

    }catch(err){
        console.log("Could not make proper request")
        res.send(err)
    }   

}