import { Link, useLocation } from "react-router-dom"
import home from "../assets/home.png"
import musicNote from "../assets/music-note.png"
import folder from "../assets/folder.png"
import { useState, useEffect } from "react"


export function SavedPage(){
    //STATES
    
    const [savedTracks, setSavedTracks] = useState([])


    //FETCH REQUESTS


    const getSavedTracks = async () => {
        try{
            const response = await fetch("http://127.0.0.1:3001/saved", {
                method: "GET", 
                credentials: "include", 
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const text = await response.json()
            console.log(text)
        }catch(err){
            console.log("Could not make fetch request")
            console.log(err.response?.data);         // API error response (e.g. from Spotify)
            console.log(err.response?.status);       // HTTP status code (e.g. 401, 403, 500)
            console.log(err.response?.statusText);   // Status text (e.g. "Unauthorized")
            console.log(err.message);  
        }
    }




    //USE EFFECTS

    useEffect(() =>{
        getSavedTracks()
    }, [])

    return(
        <>
            <div id="background">
                <div id="nav-bar-container">
                    <nav id="navbar">
                        <ul id="navbarUL">
                        <Link className="nav-a" to="/home"> <img className="nav-icon" id="home-png" src={home}/> </Link>
                        <a className="nav-a" href="/explore"> <img className="nav-icon" id="music-note" src={musicNote}/> </a>
                        <a className="nav-a" href="/saved"> <img className="nav-icon" id="folder" src={folder}/> </a>
                        </ul>
                    </nav>
                </div>
            </div>
            <h1>Hello</h1>
        </>
    )
}