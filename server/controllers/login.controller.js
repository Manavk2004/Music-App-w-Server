export function login(req, res){
    console.log('Login endpoint hit')
    
    const client_id = process.env.CLIENT_ID
    const client_secret = process.env.CLIENT_SECRET
    const redirect_uri = "https://musai.onrender.com/callback"
    
    if (!client_id || !client_secret) {
        return res.status(500).json({ error: 'Spotify credentials not configured' })
    }
    
    const scopes = 'user-read-private user-read-email user-top-read user-read-recently-played user-library-read'
    const authUrl = 'https://accounts.spotify.com/authorize' + 
        `?response_type=code&client_id=${client_id}` + 
        `&scope=${encodeURIComponent(scopes)}` + 
        `&redirect_uri=${encodeURIComponent(redirect_uri)}`
    
    console.log('Redirecting to:', authUrl)
    res.redirect(authUrl)
}

