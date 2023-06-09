import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const playlistSelection = () => {

    const [playlists, setPlaylists] = useState([])
    const [gameId, setGameId] = useState(null)
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const getUserPlaylists = async () => {
        try {
            const response = await fetch(`/api/v1/playlistSelection`)
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setPlaylists(body.playlists)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    const postSelectedPlaylist = async (playlistId, total) => {
        try {
            const response = await fetch("/api/v1/game", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify( { playlistId: playlistId, trackTotal: total } )
            })
            if (!response.ok) {
                if (response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = await response.json()
                    throw new Error(errorMessage)
                }
            } 
            const responseBody = await response.json()
            const newGameId = responseBody.newGameId
            setGameId(newGameId)
            setShouldRedirect(true)
            
        } catch(err) {
            console.error("Error in fetch", err.message)
        }
    }

    useEffect(() => {
        getUserPlaylists();
    },[])

    const displayUserPlaylists = playlists.map((playlist, index) => {
        return (
            <div onClick={ ()=> {postSelectedPlaylist(playlist.playlistId, playlist.playlistTotal)}} className="button playlist-buttons" key={index}>
                <p className="playlist-name">{playlist.name}</p> 
                <p className="track-total">{playlist.playlistTotal} tracks</p>
            </div>
        )
    })

    if(shouldRedirect) {
        return <Redirect to={`/game/${gameId}`}/>
    }

    return (
        <div>
            <h1 className="home-header">Select a Playlist</h1>
            <div className="playlist-selection">
                <h5 className="general-text">Stock Playlists</h5>
                {displayUserPlaylists}
            </div>
        </div>
    )
}

export default playlistSelection