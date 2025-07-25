

export function ArtistRender(props){
    const artists = props.state
    function mapArtists(){
        return artists.map((artist, index) =>{
            return (
                <>
                    <div key={index} class="artist-picture-container">
                        <a href={artist.uri}> <img class="explore-page-image" src={artist.images[0].url} /> </a>
                        <p class="artist-name">{artist.name}</p>
                    </div>
                </>
            )
        })
    }

    return(
        <>
            {mapArtists()}
        </>
    )
}