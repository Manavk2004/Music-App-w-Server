import axios from "axios"

export async function similarImagesController(req, res){
    let accessToken = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.query.access_token) {
        accessToken = req.query.access_token;
    } else if (req.session && req.session.access_token) {
        accessToken = req.session.access_token;
    }
    const allResults = []
    console.log("Received req body", req.body)
    for(const song of req.body){
        const [track, artist] = song.split(" (")
        console.log("Track", track)
        console.log("artsit", artist)
        const updatedArtist = artist.replace(")", "").split(" ")
        const usableTrack = track.split(" ")
        console.log("UpdatedArtist", updatedArtist)
        console.log("UsableTrack", usableTrack)
        let trackQuery = ""
        let artistQuery = ""
        for(const word of usableTrack){
            if(word.length > 0){
                trackQuery += `${word}%20`
            }
        }
        for(const word of updatedArtist){
            if(word.length > 0){
                artistQuery += `${word}%20`
            }
        }
        console.log("The track", trackQuery)
        console.log("The updated artist", artistQuery)
        try{
            const response = await axios.get(`https://api.spotify.com/v1/search?q=track%3A${trackQuery}artist%3A${artistQuery.slice(0,-3)}&type=track`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log("The response from similar ImagesController", response.data)
            if (response.data.tracks.items){
                allResults.push(response.data)
            }
        }catch(err){
            console.log("Could not make api request from similarImagesController", err)
        }
    }
    console.log("All results", allResults)
    res.json(allResults)

}