import express from "express";
import spotifyClient from "../../../apiClient/spotifyClient.js";

const gameGuessRouter = new express.Router()

gameGuessRouter.post("/", async (req, res) => {
    // const gameId = req.params.id
    try {
        const { body } = req
        const trackId = body.trackId
        const accessToken = req.user.accessToken

        const trackData = await spotifyClient.getTrackData(accessToken, trackId)

        // let guessCorrect
        // if (game.correctSongId === track.id){
        //     guessCorrect = true
        // } else {
        //     guessCorrect = false
        // }

        res.status(200).json( {trackGuess: trackData })
    } catch(err) {
        res.status(500).json({ errors: err.message })
    }
})

export default gameGuessRouter