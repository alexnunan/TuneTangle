import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const FeedbackTile = (props) => {
    const differenceObject = props.guessedSong.differenceObject
    const guessedSong = props.guessedSong
    const arrowDown = <FontAwesomeIcon icon={faArrowDown} />
    const arrowUp = <FontAwesomeIcon icon={faArrowUp} />

    let popularityFeedback
    let tempoFeedback
    let vocalPresenceFeedback

    let titleBackground
    let artistBackground
    let albumBackground
    let popularityBackground
    let tempoBackground
    let vocalBackground

    if (differenceObject.titleCorrect === true) {
        titleBackground = "success"
    }

    if (differenceObject.artistCorrect === true) {
        artistBackground = "success"
    }

    if (differenceObject.albumCorrect === true) {
        albumBackground = "success"
    }
    
    if (differenceObject.popularityCheck === "match") {
        popularityBackground = "success"
    } else if (differenceObject.popularityCheck === "less"){
        popularityFeedback = arrowDown
    } else if (differenceObject.popularityCheck === "more"){
        popularityFeedback = arrowUp
    }

    if (differenceObject.tempoCheck === "match") {
        tempoBackground = "success"
    } else if (differenceObject.tempoCheck === "less"){
        tempoFeedback = arrowDown
    } else if (differenceObject.tempoCheck === "more"){
        tempoFeedback = arrowUp
    }

    if (differenceObject.instrumentalnessCheck === "match") {
        vocalBackground = "success"
    } else if (differenceObject.instrumentalnessCheck === "less"){
        vocalPresenceFeedback = arrowDown
    } else if (differenceObject.instrumentalnessCheck === "more"){
        vocalPresenceFeedback = arrowUp
    }

    return (
        <div>
            <div className="grid-x feedback-body">
                <div className={`cell small-2 feedback-section ${titleBackground}`}>
                    <p className="vertically-align-feedback">{guessedSong.title}</p>
                </div>
                <div className={`cell small-2 feedback-section ${artistBackground}`}>
                    <p className="vertically-align-feedback">{guessedSong.artist}</p>
                </div>
                <div className={`cell small-2 feedback-section ${albumBackground}`}>
                    <p className="vertically-align-feedback">{guessedSong.album}</p>
                </div>
                <div className={`cell small-2 feedback-section ${popularityBackground}`}>
                    <p className="vertically-align-feedback">{popularityFeedback}</p>
                </div>
                <div className={`cell small-2 feedback-section ${tempoBackground}`}>
                    <p className="vertically-align-feedback">{tempoFeedback}</p>
                </div>
                <div className={`cell small-2 feedback-section ${vocalBackground}`}>
                    <p className="vertically-align-feedback">{vocalPresenceFeedback}</p>
                </div>
            </div>
        </div>
    )
}

export default FeedbackTile