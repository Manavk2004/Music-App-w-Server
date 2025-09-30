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
import chatSend from "../assets/chatSend.png"
import textboxArrowLeft from "../assets/textboxArrow-left.png"
import textboxArrowRight from "../assets/textboxArrow-right.png"
import  RotatingHeader  from "../components/loginPage.jsx"
import { useState, useEffect, useRef } from "react"
import { useLocation, Link } from "react-router-dom"
import { atom, useAtom } from "jotai"
import { accessToken } from "./atom/accessTokenAtom.jsx"



export default function HomePage(){
    const [play, setPlay] = useState(true)
    const [clicked, setClicked] = useState(false)
    const [linkImage, setLinkImage] = useState([])
    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const [imageIndex, setImageIndex] = useState([])
    const [loadingImages, setLoadingImages] = useState(["https://i.scdn.co/image/ab67616d0000b2739416ed64daf84936d89e671c", "https://i.scdn.co/image/ab67616d0000b273bbd45c8d36e0e045ef640411", "https://i.scdn.co/image/ab67616d0000b273982320da137d0de34410df61", "https://i.scdn.co/image/ab67616d0000b273523458c391fe8180a19a1069", "https://i.scdn.co/image/ab67616d0000b273881d8d8378cd01099babcd44"])
    const [showCursor, setShowCursor] = useState(true)
    const [mostPlayedSong, setMostPlayedSong] = useState("")
    const [showAI, setShowAI] = useState(false)
    const [systemOutputs, setSystemOutputs] = useState([])
    const [userInputs, setUserInputs] = useState([])
    const [loginURL, setloginURL] = useState("")

    //Current URL Loction 

    const location = useLocation()
    // console.log("Current Location", location)


    //Atom states

    const [ value, setValue ] = useAtom(accessToken)
    

    //USEEffects

    useEffect(() => {
        console.log("The window", window.location.search)
        const params = new URLSearchParams(window.location.search)
        const accessToken2 = params.get("access_token")
        console.log("Access token", accessToken)
        if(accessToken2 !== null){
            const splittedAccessToken = accessToken2.split(' ')[1]
            setValue(splittedAccessToken)
        }
        console.log("Here is the value", value)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() =>{
            setShowCursor(false)
        }, 2200)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() =>{
        const timer = setTimeout(() =>{
            setShowAI(true)
        }, 7000)
    })

    useEffect(() =>{
        const timer = setTimeout(() => {
            setloginURL(location.pathname + location.search)
        }, 3000)

        return () => clearTimeout(timer)

    }, [clicked])

    useEffect(() =>{
        console.log("Login URL", loginURL)
    }, [loginURL])





    
    
    
    
    const handleLogin = () => {
        window.location.href = 'https://musaib.onrender.com/login';
        
    }
    
    //FETCH "GET" REQUESTS TO BACKEND
    
    const getTopItems = () => {
        fetch('https://musaib.onrender.com/get-top-items', {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${value}`
            }
        })
        .then(res => {
            if (!res.ok) throw new Error(`Http error for getting top-items: ${res.status}`)
                return res.json()
        })
        .then(data => {
            if(!data) throw new Error('No data')
            // console.log("Top items data", data)
            // console.log(data.items[0].album)
            setMostPlayedSong(data.items[0].album.images[0].url)
        })
    }
    
    const handleArtist = () => {
        fetch('https://musaib.onrender.com/artist', {
            method: "GET", 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${value}`
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
        fetch('https://musaib.onrender.com/recently-played', {
            method: "GET", 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${value}`
            }
        })
        .then(res =>{
            if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json()
        })
        .then(data =>{
            const songs = []
            for (const song of data){
                songs.push(song.track.album.images[0].url)
            }
            console.log("Here are the songs", songs)
            setRecentlyPlayed(songs)
            }
        )
    }

    

// Fetch random images when component mounts and location has no search params. This was simply to generate the images for the loading page. Leaving this in here for future changes
// function getImages(){
//     fetch("http://127.0.0.1:3001/random-image", {
//         method: "GET",
//         credentials: "include", 
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(res => {
//         console.log("In step two")
//         if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
//         return res.json()
//     })
//     .then(data => console.log("Here is the data", data))
//     .catch(err => console.error('Random image fetch error:', err))
// }







    // FETCH POST REQUEST TO THE BACKEND



    const sendTopItems = async () =>{
        try{
            console.log("Entered")
            const data = {
                mostPlayed: mostPlayedSong
            }
            if(!data) throw new Error("No data")
            console.log("Data updated")
            const result = await fetch('https://musaib.onrender.com/aiconfig', {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${value}`
                },
                body: JSON.stringify(data)
            })
            console.log(result)
            console.log("Fetch done")
            const results = await result.json()
            // console.log("await done, here is the result", results)
            // console.log("The result", results)
        }catch(err){
            console.log("Could not post data", err)
        }
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

     async function loadUserInputs(){
        const content = editableRef.current.innerText
        console.log("Content for fetch request", content)
        try{
            const response = await fetch('https://musaib.onrender.com/response', {
                method: "POST", 
                credentials: "include", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${value}`
                },
                body: JSON.stringify({content})
            })
            const text = await response.text()
            const cleaned = text.replace(/\*\*/g, '').replace(/\\n/g, '\n');
            cleaned.replace(/"/g, "")
            console.log("Response from AI", cleaned)
            setUserInputs((prev) => ([...prev, content]))
            setSystemOutputs((prev) => ([...prev, cleaned]))
        }catch(err){
            console.log("Error in getting response from /response", err)
        }
    }



    //REFS
    const imageRef = useRef("")
    const linkRef = useRef("")
    const editableRef = useRef("")



    

    return(
        <>
            <div id="background">
                <div id="nav-bar-container">
                    <nav id="navbar">
                        <ul id="navbarUL">
                        <Link className="nav-a" to="/home"> <img className="nav-icon" id="home-png" src={home}/> </Link>
                        <Link className="nav-a" to="/explore"> <img className="nav-icon" id="music-note" src={musicNote}/> </Link>
                        <a className="nav-a" href="/saved"> <img className="nav-icon" id="folder" src={folder}/> </a>
                        {!location.search.startsWith("?access") &&
                            <button id="profile-button" className="nav-a" onClick={ handleLogin } > <img id="profile" src={profile}/> </button>
                        }
                        {location.search.startsWith("?access") &&
                            <button id="profile-button-loggedIn" className="nav-a" onClick={() => {handleLogin() }}> <img className='nav-icon' id="profile" src={profile}/> </button>
                        }
                        </ul>
                    </nav>
                </div>

                <div id="body-container">

                    {/* This is all involving the loading page before we login. !clicked means we have not logged in */}
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

                            <div id="mp3-container1">
                                <div id="mp3-photo-1">
                                    <img class="mp3-image" src={loadingImages[4]} />
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
                                <div class="header-container">
                                    {!location.search.startsWith("?access") &&
                                        <>
                                            <h1 id="loading-page-header1" className={showCursor ? "typewriter" : "no-cursor" }>
                                                Welcome to your personal dashboard
                                            </h1>
                                            <h1 id="loading-page-header2" className={showCursor ? "noCursorPrior" : "typewriter"}>
                                                Press the icon to login
                                            </h1>
                                        </>
                                    }
                                </div>
                                {location.search.startsWith("?access") &&
                                    <button id="enter-button" onClick={() => {recentlyPlayedFunc(); handleArtist(); loadImages(); getTopItems()}}>ENTER</button>
                                }
                            </div>
                        </>
                    }
                    {/* This is where we login and we load the states up with the images for the fidgets and mp3 player */}
                    {clicked && recentlyPlayed.length === 20 && imageIndex.length === 4 &&
                        <>
                            <div className="fidgets" id="fidget1">
                                <img className="fidget-image" src={recentlyPlayed[imageIndex[0]]} />
                            </div>
                            <div className="fidgets" id="fidget2">
                                <img className="fidget-image" src={recentlyPlayed[imageIndex[1]]} />
                            </div>
                            <div className="fidgets" id="fidget3">
                                <img className="fidget-image" src={recentlyPlayed[imageIndex[2]]} />
                            </div>
                            <div className="fidgets" id="fidget4">
                                <img className="fidget-image" src={recentlyPlayed[imageIndex[3]]} />
                            </div>
                        </>
                    }
                    {/* This is now */}
                    {clicked && 
                        <>
                            <div id="mp3-container1">
                                <div id="mp3-photo-1">
                                    {clicked && recentlyPlayed.length === 20 && imageIndex.length === 4 &&
                                        <img className="mp3-image" src={mostPlayedSong} />
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
                                {!showAI &&
                                    <>
                                        <div class="header-container">
                                            <h1 id="enter-page-header" className={showCursor ? "typewriter" : "noCursor" }>Hello, I am MusAI</h1>
                                            <h1 id="enter-page-header2" className={showCursor ? "noCursorPrior" : "typewriter"}>Let's Get Started </h1>
                                        </div>
                                        {/* <div>
                                            <button onClick={sendTopItems}>Access AI</button>
                                        </div> */}
                                    </>
                                }
                                {showAI &&
                                    <>  
                                        <div class="fade-overlay" id="chatbox">
                                            <div id="texting-container">
                                                <div class="user-responses-container">
                                                        <div class="individual-response-container">
                                                            <p class="bot-responses">Welcome</p>
                                                            <img src={textboxArrowLeft} />
                                                        </div>
                                                        {userInputs.map((input, index) =>(
                                                            <div class="response-set">
                                                                <div class="individual-response-container-2">
                                                                    <p class="user-responses">{input}</p>
                                                                    <img src={textboxArrowRight} />
                                                                </div>
                                                                <div class="individual-response-container">
                                                                    <p class="bot-responses">{systemOutputs[index]}</p>
                                                                    <img src={textboxArrowLeft} />
                                                                </div>
                                                            </div>
                                                            
                                                        ))}
                                                </div>
                                            </div>
                                            <div id="user-question-box">
                                                <div id="editable" ref={editableRef} contentEditable="true"></div>
                                                
                                                <img src={chatSend} onClick={() => { {loadUserInputs()}; editableRef.current.innerText="" } }/>
                                            </div>
                                        </div>
                                    
                                    </>
                                }

                            </div>
                            
                        </>
                    }
                </div>
            </div>
        </>
    )
}