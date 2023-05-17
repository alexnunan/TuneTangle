import express from "express";
import { Track } from "../../../models/index.js";

const guessRouter = new express.Router()
// ideally this becomes a nested router: gameGuessesRouter
// this will be moved to the gameGuessesRouter

guessRouter.post("/", async (req, res) => {
    // const gameId = req.params.id
    try {
        const { body } = req
        const songGuess = body.songGuess
        const track = await Track.query().findOne({title: songGuess})

        // let guessCorrect
        // if (game.correctSongId === track.id){
        //     guessCorrect = true
        // } else {
        //     guessCorrect = false
        // }

        res.status(200).json( {trackGuess: track})
    } catch(err) {
        res.status(500).json({ errors: err.message })
    }
})

guessRouter.get("/:songSearch", async (req, res) => {
    const { songSearch } = req.params
    try {
        const tracks = await Track.query().whereRaw(`title ILIKE ? || '%'`, [songSearch])
        return res.status(200).json({ suggestedTracks: tracks })
    } catch (err) {
        return res.status(500).json({ errors: err.message })
    }
})

export default guessRouter