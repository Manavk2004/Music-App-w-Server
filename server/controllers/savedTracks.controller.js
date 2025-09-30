import axios from "axios"


export async function savedTracksController(req, res){
    let accessToken = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.query.access_token) {
        accessToken = req.query.access_token;
    } else if (req.session && req.session.access_token) {
        accessToken = req.session.access_token;
    }

    try{
        const response = await axios.get("https://api.spotify.com/v1/me/tracks?limit=50", {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log("response from savec controller", response)
        res.json(response.data)

    }catch(err){
        console.log(err.response?.data);         
        console.log(err.response?.status);       
        console.log(err.response?.statusText);   
        console.log(err.message);  
        res.json("Could not accesssaved tracks api", err)
    }
}