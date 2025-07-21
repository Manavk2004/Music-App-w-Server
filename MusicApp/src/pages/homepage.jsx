import home from "../assets/home.png"
import musicNote from "../assets/music-note.png"
import folder from "../assets/folder.png"
import profile from "../assets/profile.png"
import shuffle from "../assets/shuffle.png"
import playbutton from "../assets/playbutton.png"
import pausebutton from "../assets/pausebutton.png"
import skipForward from "../assets/skipForward.png"
import restart from "../assets/restart.png"
import goBack from "../assets/goBack.png"
import  RotatingHeader  from "../components/loginPage.jsx"
import { useState, useEffect, useRef } from "react"
import { useLocation, Link } from "react-router-dom"


export default function homePage(){
    const [play, setPlay] = useState(true)
    const [clicked, setClicked] = useState(false)
    const [linkImage, setLinkImage] = useState([])
    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const [imageIndex, setImageIndex] = useState([])
    const [loadingImages, setLoadingImages] = useState(["https://i.scdn.co/image/ab67616d0000b2739416ed64daf84936d89e671c", "https://i.scdn.co/image/ab67616d0000b273bbd45c8d36e0e045ef640411", "https://i.scdn.co/image/ab67616d0000b273982320da137d0de34410df61", "https://i.scdn.co/image/ab67616d0000b273523458c391fe8180a19a1069", "https://i.scdn.co/image/ab67616d0000b273881d8d8378cd01099babcd44"])


    //Current URL Loction 

    const location = useLocation()
    console.log("Current Location", location)

    //REFS
    const imageRef = useRef("")
    const linkRef = useRef("")
    

    //USEEffects

    useEffect(() =>{
        console.log(imageRef.current, linkRef.current)
    }, [])

    useEffect(() =>{
        console.log(recentlyPlayed)
    }, [recentlyPlayed])

    useEffect(() =>{
        console.log("Recently Played", imageIndex)
    }, [imageIndex])


    // Fetch random images when component mounts and location has no search params
    function getImages(){
        fetch("http://127.0.0.1:3001/random-image", {
            method: "GET",
            credentials: "include", 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log("In step two")
            if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
            return res.json()
        })
        .then(data => console.log("Here is the data", data))
        .catch(err => console.error('Random image fetch error:', err))
    }




    const handleLogin = () => {
        window.location.href = "http://127.0.0.1:3001/login";
        
    }

    const handleArtist = () => {
        fetch('http://127.0.0.1:3001/artist', {
            method: "GET", 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => setLinkImage(data))
        .catch(err => console.error('Fetch error:', err))
        // console.log("Image", imageRef, "Link", linkRef)
        setClicked(() => true)
    }

    const recentlyPlayedFunc = () =>{
        fetch('http://127.0.0.1:3001/recently-played', {
            method: "GET", 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res =>{
            if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json()
        })
        .then(data =>{
            const songs = []
            for (const song of data){
                songs.push(song.track.album.images[0])
            }
            // console.log("Here are the songs", songs)
            setRecentlyPlayed(songs)
        }
        )
    }


    //Functions
    function loadImages(){
        const imagesSet = new Set()
        for(let i=0; i < 10; i++){
            const randomInt = Math.floor(Math.random()* 20) + 1
            imagesSet.add(randomInt)
            if (imagesSet.size === 4){
                const myArray = [...imagesSet]
                setImageIndex(() => myArray)
            }
        }

    }

    

    return(
        <>
            <div id="background">
                <div id="nav-bar-container">
                    <nav id="navbar">
                        <ul id="navbarUL">
                        <Link className="nav-a" href="/home"> <img className="nav-icon" id="home-png" src={home}/> </Link>
                        <a className="nav-a" href="/explore"> <img className="nav-icon" id="music-note" src={musicNote}/> </a>
                        <a className="nav-a" href="/saved"> <img className="nav-icon" id="folder" src={folder}/> </a>
                        <button id="profile-button" className="nav-a" onClick={handleLogin}> <img className="nav-icon" id="profile" src={profile}/> </button>
                        </ul>
                    </nav>
                </div>

                <div id="body-container">
                    {!clicked &&
                        <>
                            <div className="fidgets" id="fidget1">
                                <img className="fidget-image" src={loadingImages[0]} />
                            </div>
                            <div className="fidgets" id="fidget2">
                                <img className="fidget-image" src={loadingImages[1]} />
                            </div>
                            <div className="fidgets" id="fidget3">
                                <img className="fidget-image" src={loadingImages[2]} />
                            </div>
                            <div className="fidgets" id="fidget4">
                                <img className="fidget-image" src={loadingImages[3]} />
                            </div>
                        </>
                    }
                    {clicked && recentlyPlayed.length === 20 && imageIndex.length === 4 &&
                        <>
                            <div className="fidgets" id="fidget1">
                                <img className="fidget-image" src={recentlyPlayed[imageIndex[0]].url} />
                            </div>
                            <div className="fidgets" id="fidget2">
                                <img className="fidget-image" src={recentlyPlayed[imageIndex[1]].url} />
                            </div>
                            <div className="fidgets" id="fidget3">
                                <img className="fidget-image" src={recentlyPlayed[imageIndex[2]].url} />
                            </div>
                            <div className="fidgets" id="fidget4">
                                <img className="fidget-image" src={recentlyPlayed[imageIndex[3]].url} />
                            </div>
                        </>
                    }
                    <div id="mp3-container1">
                        <div id="mp3-photo-1">
                            {clicked && recentlyPlayed.length === 20 && imageIndex.length === 4 &&
                                <img id="mp3-image" src={recentlyPlayed[0].url} />
                            }
                        </div>

                        <div id="audio-controls">
                            <img id="restart-button" src={restart}/>
                            <img  id="go-back" src={goBack}/>
                            <img onClick={() => setPlay((prev) => (!prev))} id="play-button" src={play === true ? playbutton : pausebutton}/>
                            <img id='skip-forward' src={skipForward}/>
                            <img id="shuffle-button" src={shuffle}/>
                        </div>
                    </div>
                    <div id="chat-bot">
                        {!clicked &&
                            <button onClick={() => {recentlyPlayedFunc(); handleArtist(); loadImages()}}>LOGIN</button>
                        }
                        {clicked && 
                            <div>
                                <button onClick={getImages}>Get Images</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}