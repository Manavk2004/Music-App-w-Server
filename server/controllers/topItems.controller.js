import axios from "axios"


export async function topItemsController(req, res){
    let accessToken = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.query.access_token) {
        accessToken = req.query.access_token;
    } else if (req.session && req.session.access_token) {
        accessToken = req.session.access_token;
    }
    const type = "tracks"
    try{
        const request = await axios.get(`https://api.spotify.com/v1/me/top/${type}?time_range=short_term`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        res.json(request.data)
    }catch(err){
        console.log("Could not make request to api", err)
        res.json("This is the error from the request", err)
    }
}