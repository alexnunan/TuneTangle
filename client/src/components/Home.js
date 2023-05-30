import React, { useState, useEffect } from "react";
import FeedbackTile from "./FeedbackTile";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField"
import Modal from "react-modal";

const Home = (props) => {
    const [songSearch, setSongSearch] = useState("")
    const [guessedSongs, setGuessedSongs] = useState([])
    const [dropDownTracks, setDropDownTracks] = useState([])
    const [randomSongData, setRandomSongData] = useState({})
    const [guessCorrect, setGuessCorrect] = useState(false)
    const [releaseYears, setReleaseYears] = useState([])
    const [yearsObject, setYearsObject] = useState({
        lowYear: "?",
        highYear: "?",
        songDate: "?"
    })
    console.log(randomSongData)
    const gameId = props.match.params.id

    const getReleaseYearFeedback = (releaseYears) => {
        if(releaseYears.length>0){
            const lowerYears = releaseYears.filter(num => num < randomSongData.releaseYear);
            const higherYears = releaseYears.filter(num => num > randomSongData.releaseYear);
            
            const maxLower = lowerYears.length > 0 ? Math.max(...lowerYears): "?"
            const minHigher = higherYears.length > 0 ? Math.min(...higherYears): "?"

            if (releaseYears.includes(randomSongData.releaseYear)){
                setYearsObject(yearsObject => ({...yearsObject, songDate: randomSongData.releaseYear}))
            }

            if(higherYears) {
                setYearsObject(yearsObject => ({...yearsObject, highYear: minHigher}))
            }
            
            if(lowerYears) {
                setYearsObject(yearsObject => ({...yearsObject, lowYear: maxLower}))
            }
        }
    }

    const postSongTitleGuess = async (trackId) => {
        try {
            const response = await fetch(`/api/v1/game/${gameId}/guess`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify( {trackId, gameId} )
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
            setReleaseYears([...releaseYears, responseBody.trackGuess.releaseYear])
            if (responseBody.winStatus) {
                setGuessCorrect(true)
            }
        } catch(err) {
            console.error("Error in fetch", err.message)
        }
    }

    const getGameData = async () => {
        try {
            const response = await fetch(`/api/v1/game/${gameId}`)
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setDropDownTracks(body.playlistTracks)
            setRandomSongData(body.randomSongData)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getGameData();
        Modal.setAppElement("body")
    }, [])
    
    useEffect(() => {
        getReleaseYearFeedback(releaseYears)
    },[releaseYears])

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
        setSongSearch("") 
    };
    
    const feedbackTiles = guessedSongs.map((song, index) => {
        return <FeedbackTile key={song.id} guessedSong={song} />;
    })

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
                            renderInput={(params) => <TextField {...params} onChange={handleInputChange}/>}
                        />
                        <input type="submit" value="Submit" className="input-submit" />
                    </div>
                </form> 
            </div>
            <div className="release-year-section">
                <h5>Release Year</h5>
                <div className="">
                    <p className="years-display">{yearsObject.lowYear}</p>
                    <p className="years-display">{`<`}</p>
                    <p className="years-display">{yearsObject.songDate}</p>
                    <p className="years-display">{`<`}</p>
                    <p className="years-display">{yearsObject.highYear}</p>
                </div>
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
                    <p>Popularity:</p>
                </div>
                <div className="cell small-2 feedback-headers">
                    <p>Beats per Minute:</p>
                </div>
                <div className="cell small-2 feedback-headers">
                    <p>Vocal Presence:</p>
                </div>
            </div>
            {feedbackTiles}
            <Modal
            isOpen={guessCorrect}
            onRequestClose={() => setGuessCorrect(false)}
            className="modal-content">
                <div>
                    <h4>You Win!</h4>
                    <p>{`The random song was ${randomSongData.title} `}</p>
                </div>
                <a href="/playlistSelection" className="button">Select a new playlist</a>
            </Modal>
        </div>
    )
}
    
export default Home