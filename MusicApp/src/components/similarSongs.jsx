import { useEffect, useState } from "react"
export function SimilarSongs(props){
    const state = props.state



    function displayPropImages(songs){
        const images = []
        const uri = []
        for (const song of songs){
            console.log("The song", song)
            if(song.tracks.items.length === 0){
                continue
            }
            const theAlbum = song.tracks.items[0].album
            images.push(theAlbum.images[0].url)
            uri.push(song.tracks.items[0].uri)

        }
        return images.map((url, index) =>{
            return <a href={uri[index]} ><img className="similar-images" src={url} /> </a>
        })
    }


    return(
        <>
            {displayPropImages(state)}
        </>
    )
}