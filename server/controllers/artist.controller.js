import express from "express"
import dotenv from "dotenv"
import axios from "axios"

export async function artist(req, res){
    console.log("Here is the session access_token", req.session.access_token)
    const id = "0TnOYISbd1XYRBk9myaseg"
    const accessToken = req.session.access_token
    console.log("Access token", accessToken)
    
    if (!accessToken) {
        return res.status(401).json({ error: 'No access token found. Please login first.' })
    }
    
    try{
        const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                market: 'US'  // Required parameter
            }
        })
        console.log("Content:", response.data.tracks[0]?.album.images[0].url, "everything else", response.data.tracks[0]?.album.uri)
        res.json([response.data.tracks[0]?.album.images[0].url, response.data.tracks[0]?.album.uri])  // Send data to frontend
    }catch(err){
        console.log("Error:", err.response?.data || err.message)
        res.status(500).json({ 
            error: 'Failed to fetch artist data', 
            details: err.response?.data || err.message 
        })
    }
}