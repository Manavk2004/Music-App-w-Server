import express from "express"
import dotenv from "dotenv"
import axios from "axios"

export async function artist(req, res){
    console.log("Here is the session access_token", req.session.access_token)
    const id = "0TnOYISbd1XYRBk9myaseg"
    const accessToken = req.session.access_token
    console.log("Access token", accessToken)
    try{
        const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        res.json(response.data.items[0].images[0].url)
    }catch(err){
        console.log(err)
    }
    
}