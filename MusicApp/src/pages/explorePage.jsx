import home from "../assets/home.png"
import musicNote from "../assets/music-note.png"
import folder from "../assets/folder.png"
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react"
import { ImageRender } from "../components/imageRender.jsx"
import { ArtistRender } from "../components/artistRender.jsx"

export function ExplorePage(){

    const [topSongs, setTopSongs] = useState([])
    const [topArtists, setTopArtists] = useState([])
    const [animate, setAnimate] = useState(false)
    const [ accessToken, setAccessToken ] = useState(null)

    const location = useLocation()
    console.log(location)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const accessToken = params.get("access_token")
        if (accessToken !== null){
            setAccessToken(accessToken)
        }
    }, [])

    //fetchRequests
    const getTopFiveSongs = async () =>{
        try{
            const response = await fetch("https://musaib.onrender.com/get-top-items", {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const text = await response.json()
            console.log("API response for top songs:", text)
            const items = Array.isArray(text.items) ? text.items : [];
            const sliced = items.slice(0, 5)
            setTopSongs(sliced)
        }catch(err){
            console.log("Could not get top 5 songs", err)
        }
    }

    const getTopFiveArtists = async () =>{
        try{
            const response = await fetch("https://musaib.onrender.com/top-artists", {
                method: "GET",
                credentials: 'include',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const text = await response.json()
            console.log("API response for top artists:", text)
            const arrTopArtists = Array.isArray(text.items) ? text.items : [];
            const sliced = arrTopArtists.slice(0, 5)
            setTopArtists(sliced)
        }catch(err){
            console.log("Fetch error for artists", err)
        }
    }


    //UseEffects

    useEffect(() =>{
        getTopFiveSongs()
    }, [])

    useEffect(() =>{
        getTopFiveArtists()
    }, [])

    useEffect(() =>{
        console.log("Top Artists", topArtists)
    }, [topArtists])

    useEffect(() =>{
        if (topArtists.length > 0 && topSongs.length > 0){
            setAnimate(true)
        }
    }, [topArtists.length, topSongs.length])


   

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
                <div id="content">
                    <div>
                        <h1 id="songs-header">Your Top Songs</h1>
                    </div>
                    <div id="music-container">
                        {animate && <ImageRender state={topSongs} />}
                    </div>
                    <div>
                        <h1 id="artists-header">Your Top Artists</h1>
                    </div>
                    <div id="artists-container">
                        {animate && <ArtistRender state={topArtists} />}
                    </div>
                </div>

            </div>
        </>
    )
}