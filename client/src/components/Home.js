import React, { useState } from "react";
import FeedbackTile from "./FeedbackTile";

const Home = () => {

    const [songSearch, setSongSearch] = useState("")
    const [guessedSongs, setGuessedSongs] = useState([])

    const postSongTitleGuess = async () => {
        try {
            const response = await fetch("/api/v1/guess", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify( {songGuess: songSearch} )
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

    const handleInputChange = event => {
        setSongSearch(event.currentTarget.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        postSongTitleGuess()
    }

    const feedbackTiles = guessedSongs.map(song => {
        return (
            <FeedbackTile key={song.id} {...song} />
        )
    })

    return (
        <div>
            <h1 className="home-header">Tune Tangle</h1>
            <form className="song-search" onSubmit={handleSubmit}>
                <label>
                    Enter a song:
                    <input
                        type="text"
                        name="songSearch"
                        onChange={handleInputChange}
                        value={songSearch}
                    />
                </label>
                <input type="submit" value="Submit"/>
            </form>
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