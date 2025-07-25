import axios from "axios"


export async function savedTracksController(req, res){
    console.log("Hello from savedTracksController")
    const key = req.session.access_token
    console.log(key)
    if(!key){
        console.log("Key not found in savedTracksController")
    }

    try{
        const response = await axios.get("https://api.spotify.com/v1/me/tracks?limit=50", {
            headers:{
                Authorization: `Bearer ${key}`
            }
        })
        res.json(response.data)

    }catch(err){
        console.log(err.response?.data);         
        console.log(err.response?.status);       
        console.log(err.response?.statusText);   
        console.log(err.message);  
        res.json("Could not accesssaved tracks api", err)
    }
}