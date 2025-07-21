import axios from "axios"

export async function randomImageGenerator(req, res){
    const key = req.session.access_token
    console.log("Here is the key", key)
    // Check if access token exists
    if (!key) {
        console.log("No access token found in session")
        return res.status(401).json({ error: "Access token not found. Please login first." })
    }
    
    try{
        // Artist IDs for the request
        const artistIds = ["3TVXtAsR1Inumwj472S9r4","4q3ewBCX7sLwd24euuV69X","1Xyo4u8uXC1ZmMpatF05PJ","6M2wZ9GZgrQXHCFfjv46we","0Y5tJX1MQlPlqiwlOH1tJY"]
        
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistIds[4]}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${key}`
            }
        })
        
        console.log("Successfully fetched tracks:", response.data)
        res.json(response.data)
    }
    catch(err){
        console.log("Error fetching tracks:", err.response?.data || err.message)
        
        // Handle different types of errors
        if (err.response) {
            // The request was made and the server responded with a status code
            const status = err.response.status
            const errorData = err.response.data
            
            if (status === 401) {
                res.status(401).json({ error: "Invalid or expired access token" })
            } else if (status === 400) {
                res.status(400).json({ error: "Bad request to Spotify API", details: errorData })
            } else {
                res.status(status).json({ error: "Spotify API error", details: errorData })
            }
        } else if (err.request) {
            // The request was made but no response was received
            res.status(500).json({ error: "No response from Spotify API" })
        } else {
            // Something happened in setting up the request
            res.status(500).json({ error: "Request setup error", message: err.message })
        }
    }
}