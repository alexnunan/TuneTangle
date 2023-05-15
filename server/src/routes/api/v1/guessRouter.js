import express from "express";
import { Track } from "../../../models/index.js";

const guessRouter = new express.Router()

guessRouter.post("/", async (req, res) => {
    try {
        const { body } = req
        const songGuess = body.songGuess
        const track = await Track.query().findOne({title: songGuess})
        res.status(200).json( {trackGuess: track})
    } catch(err) {
        res.status(500).json({ errors: err.message })
    }
})

export default guessRouter