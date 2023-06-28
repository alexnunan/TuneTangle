import React, { useState, useEffect } from "react";
import FeedbackTile from "./FeedbackTile";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField"
import Modal from "react-modal";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Howl, Howler } from 'howler';


const Home = (props) => {
    const [songSearch, setSongSearch] = useState("")
    const [guessedSongs, setGuessedSongs] = useState([])
    const [dropDownTracks, setDropDownTracks] = useState([])
    const [randomSongData, setRandomSongData] = useState({})
    const [guessCorrect, setGuessCorrect] = useState(false)
    const [releaseYears, setReleaseYears] = useState([])
    const [previewUrl, setPreviewUrl] = useState("")
    const [yearsObject, setYearsObject] = useState({
        lowYear: "?",
        highYear: "?",
        songDate: "?"
    })
    const [audioPlayer, setAudioPlayer] = useState(null);

    const gameId = props.match.params.id

    const handleAudioPlayback = () => {
        if (audioPlayer && previewUrl) {
            const playbackDuration = (guessedSongs.length + 1) * 1000; // Increase duration by 3 seconds for each guess
            audioPlayer.stop(); // Stop the currently playing audio
            audioPlayer.seek(0); // Restart the audio from the beginning
            audioPlayer.src = previewUrl;
            audioPlayer.play();
            setTimeout(() => {
                audioPlayer.pause();
                }, playbackDuration);
        }
    };

    useEffect(() => {
        if (previewUrl) {
            const sound = new Howl({
            src: [previewUrl],
            html5: true,
            });
            setAudioPlayer(sound);
        }
    }, [previewUrl]);

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
            setPreviewUrl(body.randomSongData.previewUrl)
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
        <div className="game-section">
            <h1 className="home-header">TuneTangle</h1>
            <div className="song-search">
                <form onSubmit={handleSubmit} className="form">
                    <div className="form__center-content">
                        <div>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                onChange={handleDropdownSelection}
                                options={dropDownOptions}
                                sx={{
                                    border: "none",
                                    borderRadius: "16px",
                                    width: 400,
                                    "& .MuiOutlinedInput-root": {
                                        border: "none",
                                        borderRadius: "16px",
                                        padding: "0",
                                        backgroundColor: "white"
                                    },
                                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                        border: "none",
                                        borderRadius: "16px"
                                    },
                                }}
                                renderInput={(params) => <TextField className="textfield"{...params} onChange={handleInputChange}/>}
                            />
                        </div>
                        <input type="submit" value="Guess" className="input-submit sign-in" />
                    </div>
                </form> 
            </div>
            <div className="play-bar-section">
                <FontAwesomeIcon onClick={handleAudioPlayback} className="play-button" icon={faCirclePlay} />
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
                <img className="album-image" src={`${randomSongData.imageUrl}`}></img>
                <a href="/playlistSelection" className="modal-button button">Select a new playlist</a>
            </Modal>
        </div>
    )
}
    
export default Home