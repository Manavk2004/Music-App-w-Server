
export function ImageRender(props){
    const albumOne = props.state
    console.log("the state", albumOne)

    function renderImages(){
        const index = 0
        return props.state.map((song, index) =>{
            return (
                <div key={index} className="fidget-explore" id={`fidget${index}-explore`}>
                    <a href={song.uri}><img className="explore-fidget-img" src={song.album.images[0].url}/></a>
                    <div className="music-info">
                        <p className="song-names">{song.name}</p>
                        <p className="song-artist">{song.album.artists[0].name}</p>
                    </div>
                </div>
            )
        })
    }
    return(
        <>
            {renderImages()}
        </>
    )
}