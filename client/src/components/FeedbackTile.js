import React from "react"

const FeedbackTile = ({title, artist, album, genres, releaseDate, duration}) => {

    const reformatDuration = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds/60)
        const seconds = timeInSeconds - minutes * 60
        if (seconds>=10){
            return `${minutes}:${seconds}`
        } else {
            return `${minutes}:0${seconds}`
        }
    }

    return (
        <div className="grid-x feedback-body">
            <div className="cell small-2 feedback-section">
                <p className="vertically-align-feedback">{title}</p>
            </div>
            <div className="cell small-2 feedback-section">
                <p className="vertically-align-feedback">{artist}</p>
            </div>
            <div className="cell small-2 feedback-section">
                <p className="vertically-align-feedback">{album}</p>
            </div>
            <div className="cell small-2 feedback-section">
                <p className="vertically-align-feedback">{genres}</p>
            </div>
            <div className="cell small-2 feedback-section">
                <p className="vertically-align-feedback">{releaseDate}</p>
            </div>
            <div className="cell small-2 feedback-section">
                <p className="vertically-align-feedback">{reformatDuration(duration)}</p>
            </div>
        </div>
    )
}

export default FeedbackTile