import React, { useState, useEffect } from "react";

const playlistSelection = () => {

    const [userPlaylists, setUserPlaylists] = useState([])

    const getUserPlaylists = async () => {
        try {
            const response = await fetch(`/api/v1/playlistSelection`)
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            console.log(body.userPlaylists)
            setUserPlaylists(body.userPlaylists)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getUserPlaylists();
    },[])

    const displayUserPlaylists = userPlaylists.map((playlist, index) => {
        return (
            <p className="small-margin" key={index}>{playlist}</p>
        )
    })

    return (
        <div>
            <h1 className="home-header">Select Your Playlist</h1>
            <div className="grid-x">
                <h5 className="cell small-6">Your Playlists</h5>
                {displayUserPlaylists}
                <h5 className="cell small-6">Preselected Playlists</h5>
            </div>
        </div>
    )
}

export default playlistSelection