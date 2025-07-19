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


import { useState, useEffect } from "react" 


export default function homePage(){
    const [play, setPlay] = useState(true)


    //URL CHANGES:

    const handleLogin = () => {
        window.location.href = "http://127.0.0.1:3001/login";
    }

    const handleArtist = () => {
        window.location.href = "http://127.0.0.1:3001/artist"
    }


    const urlParams = new URLSearchParams(window.location.search)
    
    useEffect( () =>{
        console.log(urlParams)
    }, [])


    return(
        <>
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
                    </div>
                </div>
            </div>
        
        </>
    )
}