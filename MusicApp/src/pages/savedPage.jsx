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
            console.log(response)
            const items = text.items.slice(0, 19)
            console.log("The items", items)
            console.log(items[0].track.name)
            const arrayOfSongs = items.map((song, index) =>{
                return(
                    `${song.track.name}(${song.track.artists[0].name})`
                )
            })
            setSavedTracks(arrayOfSongs)
        }catch(err){
            console.log("Could not make fetch request")
            console.log(err.response?.data);         
            console.log(err.response?.status);       
            console.log(err.response?.statusText);   
            console.log(err.message);  
        }
    }



    //USE EFFECTS

    useEffect(() =>{
        getSavedTracks()
    }, [])

    useEffect(() =>{
        console.log("The saved songs", savedTracks)
    }, [savedTracks])


    async function fetchData(){
        console.log(savedTracks)
        if (savedTracks.length > 0){
            try{
                const response = await fetch("http://127.0.0.1:3001/similar-songs", {
                    method: "POST", 
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({savedTracks})
                })
                const text = await response.json()
                console.log("Response from similar songs fetch", text)
                console.log(text.split("\n"))
                setSavedTracks(text.split("\n"))

            }catch(err){
                console.log("Error in sending savedTracks array", err)
            }
        }
    }
    



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
                <button onClick={() => fetchData()}>Get Recommendations</button>
            </div>
            <h1>Hello</h1>
        </>
    )
}