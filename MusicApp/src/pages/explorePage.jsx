import home from "../assets/home.png"
import musicNote from "../assets/music-note.png"
import folder from "../assets/folder.png"
import { Link, useLocation } from 'react-router-dom'

export function ExplorePage(){

    const location = useLocation()
    console.log(location)

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
                <div id="music-grid">
                    <div id="top-songs-container">
                        <div className="fidget-explore" id="fidget1-explore">
                            <h1>Hello</h1>
                        </div>
                        <div className="fidget-explore" id="fidget2-explore">
                            <h1>Hello</h1>
                        </div>
                        <div className="fidget-explore" id="fidget3-explore">
                            <h1>Hello</h1>
                        </div>
                        <div className="fidget-explore" id="fidget4-explore">
                            <h1>Hello</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}