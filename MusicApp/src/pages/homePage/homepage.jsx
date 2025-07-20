import home from "../../assets/home.png"
import musicNote from "../../assets/music-note.png"
import folder from "../../assets/folder.png"
import profile from "../../assets/profile.png"
import shuffle from "../../assets/shuffle.png"
import playbutton from "../../assets/playbutton.png"
import pausebutton from "../../assets/pausebutton.png"
import skipForward from "../../assets/skipForward.png"
import restart from "../../assets/restart.png"
import goBack from "../../assets/goBack.png"
import  RotatingHeader  from "../../components/loginPage.jsx"


import { useState, useEffect, useRef } from "react" 


export default function homePage(){
    const [play, setPlay] = useState(true)
    const [clicked, setClicked] = useState(false)
    const [image, setImage] = useState("")
    const [linkImage, setLinkImage] = useState([])
    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const [login, setLogin] = useState(false)

    // This is for the login page confoguration:
    const [index, setIndex] = useState(0)



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


    //URL CHANGES:

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
        console.log("Image", imageRef, "Link", linkRef)
        setClicked(() => true)
    }

    const recentyPlayedFunc = () =>{
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

    //Regular Functions
    



    //Login Page Title / Configuration
    // const headerCount = useRef(0)

    // function RotatingHeader(){
    //     const headers = ['Welcome to MUSAI', 'Your Personal Music Dashboard', 'Login Here']

    //     const [index, setIndex] = useState(0)

    //     useEffect(() =>{
    //         const interval = setInterval(() => {
    //             setIndex((prev) => prev + 1)
    //         }, 2000);
    //         return () => clearInterval(interval)
    //     }, [])
    //     headerCount.current += 1
        
    //     return(
    //         <h1 key={index} className="login-page-headers">
    //             {headers[index]}
    //         </h1>
    //     )
    // }

    // if (headerCount.current === 4){
    //     setLogin(() => true)
    // }


    return(
        <>
            {!login &&
                <div id='login-background'>
                    <RotatingHeader index={index} setLogin={setLogin} />
                </div>
            }
            {login &&
                <div id="background">
                    <div id="nav-bar-container">
                        <nav id="navbar">
                            <ul id="navbarUL">
                            <a className="nav-a" href="/"> <img className="nav-icon" id="home-png" src={home}/> </a>
                            <a className="nav-a" href="/explore"> <img className="nav-icon" id="music-note" src={musicNote}/> </a>
                            <a className="nav-a" href="/saved"> <img className="nav-icon" id="folder" src={folder}/> </a>
                            <button className="nav-a" onClick={handleLogin}> <img className="nav-icon" id="folder" src={profile}/> </button>
                            </ul>
                        </nav>
                    </div>

                    <div id="body-container">
                        <div className="fidgets" id="fidget1">

                        </div>
                        <div className="fidgets" id="fidget2">
                        
                        </div>
                        <div className="fidgets" id="fidget3">
                        
                        </div>
                        <div className="fidgets" id="fidget4">
                        
                        </div>
                        <div id="mp3-container1">
                            <div id="mp3-photo-1">
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
                            <button onClick={handleArtist}>Artist</button>
                            {clicked && 
                                <div>
                                    <a href={linkImage[1]}><img id="recommendation-image" src={linkImage[0]} /></a>
                                    <button onClick={recentyPlayedFunc}>Next</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        
        </>
    )
}