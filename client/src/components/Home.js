import React, { useState, useEffect } from "react";
import FeedbackTile from "./FeedbackTile";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField"

const Home = (props) => {
    const [songSearch, setSongSearch] = useState("")
    const [guessedSongs, setGuessedSongs] = useState([])
    const [dropDownTracks, setDropDownTracks] = useState([])

    const gameId = props.match.params.id

    const postSongTitleGuess = async (trackId) => {
        try {
            const response = await fetch(`/api/v1/game/${gameId}/guess`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify( {trackId: trackId} )
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
            setGuessedSongs([...guessedSongs, responseBody.trackGuess])           
        } catch(err) {
            console.error("Error in fetch", err.message)
        }
    }

    const getPlaylistTracks = async () => {
        try {
            const response = await fetch(`/api/v1/game/${gameId}`)
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setDropDownTracks(body.playlistTracks)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getPlaylistTracks();
    }, [])
    
    const handleInputChange = (event) => {
        setSongSearch(event.currentTarget.value);
    };
    
    const handleDropdownSelection = (event, newValue) => {
        setSongSearch(newValue);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault()
        let trackId
        dropDownTracks.forEach(track => {
            if (track.title === songSearch) {
                trackId = track.id
            }
        })
        postSongTitleGuess(trackId)
    };
    
    const feedbackTiles = guessedSongs.map((song) => {
        return <FeedbackTile key={song.id} {...song} />;
    });

    const dropDownOptions = dropDownTracks.map((track, index) => {
        return track.title
    })
    
    return (
        <div>
            <h1 className="home-header">Tune Tangle</h1>
            <div className="song-search">
                <form onSubmit={handleSubmit} className="form">
                    <div className="form__center-content">
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            onChange={handleDropdownSelection}
                            options={dropDownOptions}
                            className="input-text"
                            sx={{ width: 400 }}
                            renderInput={(params) => <TextField {...params} onChange={handleInputChange} label="Guess a Song" />}
                        />
                        
                        <input type="submit" value="Submit" className="input-submit" />
                    </div>
                </form> 
            </div>
            <div className="grid-x feedback-body">
                <div className="cell small-2 feedback-headers">
                        <p>Title:</p>
                    </div>
                    <div className="cell small-2 feedback-headers">
                        <p>Artist:</p>
                    </div>
                    <div className="cell small-2 feedback-headers">
                        <p>Album:</p>
                    </div>
                    <div className="cell small-2 feedback-headers">
                        <p>Genre:</p>
                    </div>
                    <div className="cell small-2 feedback-headers">
                        <p>Release Year:</p>
                    </div>
                    <div className="cell small-2 feedback-headers">
                        <p>Duration:</p>
                </div>
            </div>
            {feedbackTiles}
        </div>
    )
}
    
export default Home