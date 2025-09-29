import axios from "axios"
import session from "express-session"

export async function callBack(req, res){
    const client_id = process.env.CLIENT_ID
    const client_secret = process.env.CLIENT_SECRET
    const redirect_uri = "https://musaib.onrender.com/callback"

    // console.log('Callback endpoint hit')
    const code = req.query.code
    
    if (!code) {
        return res.status(400).json({ error: 'Authorization code not provided' })
    }
    
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token',
            new URLSearchParams({
                code, 
                redirect_uri,
                grant_type: 'authorization_code',
                client_id,
                client_secret
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded'} }
        )
        const { access_token, refresh_token } = response.data
        req.session.access_token = access_token
        // console.log("Here is the req", req.session.cookie)
        console.log(`Successfully got tokens, Access Token:${access_token}, Refresh Token: ${refresh_token}`)
        res.redirect(`https://musai.onrender.com/home?access_token=${access_token}`)
        return access_token
    } catch (error) {
        console.error('Error getting tokens:', error.response?.data || error.message)
        res.status(500).json({ error: 'Failed to get access token' })
    }
}