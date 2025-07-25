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

    const location = useLocation()
    console.log(location)

    //fetchRequests
    const getTopFiveSongs = async () =>{
        try{
            const response = await fetch("http://127.0.0.1:3001/get-top-items", {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const text = await response.json()
            const sliced = text.items.slice(0, 5)
            console.log("top 5 songs", sliced)
            setTopSongs(sliced)

        }catch(err){
            console.log("Could not get top 5 artists", err)
        }

    }

    const getTopFiveArtists = async () =>{
        try{
            const response = await fetch("http://127.0.0.1:3001/top-artists", {
                method: "GET",
                credentials: 'include',
                headers:{
                    'Content-Type': 'application/json'
                }

            })
            const text = await response.json()
            const arrTopArtists = text.items
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
    })


   

    return(
        <>
            <div id="background">
                <div id="nav-bar-container">
                    <nav id="navbar">
                        <ul id="navbarUL">
                        <Link className="nav-a" to="/home?access_token=BQAuGGOa9jE2FRv0lykhJnIERKlPhEwN-4-Htahb5ndODYgHuKIROYREKG0YMbYcd5OSVcK-CslZwoPFj8D-AHsiEFsFoftbxhEYrJEFVuBapic4UJAsgrAGkyzOcUHe-x4c9-33eoeKsdtC1V3vPb_glNR1qM6ewt4v1gBeUY54OTZybvY-MYsmT2Wa3sfbhblX9hg5_aCruLXlCBcZIl4b337JymJi3cKxaolQwgpDzpmswPiSV6_TqqzVBYQrOgfcmA"> <img className="nav-icon" id="home-png" src={home}/> </Link>
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