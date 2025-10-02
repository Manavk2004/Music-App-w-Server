import { Link, useLocation } from "react-router-dom"
import home from "../assets/home.png"
import musicNote from "../assets/music-note.png"
import folder from "../assets/folder.png"
import { useState, useEffect } from "react"
import { SimilarSongs } from "../components/similarSongs.jsx"
import { accessToken } from "./atom/accessTokenAtom.jsx"
import { atom, useAtom } from "jotai"

export function SavedPage(){
    //STATES
    
    const [savedTracks, setSavedTracks] = useState([])
    const [similarSongs, setSimilarSongs] = useState([])
    const [isSaved, setIsSaved] = useState(false)
    const [similarSongsResponse, setSimilarSongsResponse] = useState([])

    
    //Atom states
    const [ value, setValue ] = useAtom(accessToken)



    //FETCH REQUESTS


    const getSavedTracks = async () => {
        console.log("access token from getSavedtarcks", value)
        try{
            const response = await fetch('https://musaib.onrender.com/saved', {
                method: "GET", 
                credentials: "include", 
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${value}`
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


    const fetchImages = async () =>{
        try{
            const response = await fetch('https://musaib.onrender.com/similar-images', {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${value}`
                },
                body: JSON.stringify(similarSongs)
            })
            console.log("The response form fetchImages" , response)
            const text = await response.json()
            console.log("The text", text)
            setSimilarSongsResponse(text)
        }catch(err){
            console.log("Coult not make post request to getImages controller", err)
        }
    }   



    //USE EFFECTS

    useEffect(() =>{
        getSavedTracks()
    }, [])

    useEffect(() =>{
        console.log("The saved songs", savedTracks)
    }, [savedTracks])


    useEffect(() =>{
        console.log(isSaved)
    }, [])

    useEffect(() =>{
        if(similarSongs.length > 0){
            fetchImages()
        }
    }, [similarSongs])

    useEffect(() => {
        console.log("Got the similar songs response", similarSongsResponse)
    }, [similarSongsResponse])


    async function fetchData(){
        const params = new URLSearchParams(window.location.search)
        const accessToken = params.get("access_token")
        console.log(savedTracks)
        if (savedTracks.length > 0){
            try{
                const response = await fetch('https://musaib.onrender.com/similar-songs', {
                    method: "POST", 
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${value}`
                    },
                    body: JSON.stringify({savedTracks})
                })
                const text = await response.json()
                console.log("Response from similar songs fetch", text)
                console.log(text.split("\n"))
                setSimilarSongs(text.split("\n"))

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
                <div id="info-container">
                    {similarSongs.length === 0 &&
                        <div id="recommendation-container">
                            <h1 id="recommended-songs-title">Your Recommended Songs</h1>
                            <button onClick={() => fetchData()}>Get Recommendations</button>
                        </div>
                    }
                    {similarSongsResponse.length > 0 &&
                        <>
                            <div id="songs-container">
                                <h1 id="recommended-songs-title">Your Recommended Songs</h1>
                                <div id="similarsongscomponent-container">
                                    <SimilarSongs state={similarSongsResponse} />
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>

        </>
    )
}