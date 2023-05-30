import express from "express";
import { Game } from "../../../models/index.js";
import spotifyClient from "../../../apiClient/spotifyClient.js";
import gameGuessRouter from "./gameGuessRouter.js";

const gameRouter = new express.Router()
gameRouter.use("/:id/guess", gameGuessRouter)

gameRouter.post("/", async (req, res) => {
    try {
        const { body } = req
        const selectedPlaylistId = body.playlistId
        const accessToken = req.user.accessToken
        
        const randomSongId = await spotifyClient.getRandomTrackIdByPlaylist(accessToken, selectedPlaylistId)

        const newGame = await Game.query().insertAndFetch({playlistId: selectedPlaylistId, randomSongId: randomSongId})

        return res.status(200).json({ newGameId : newGame.id })
    } catch (err) {
        return res.status(500).json({ errors: err.message })
    }
})

gameRouter.get("/:id", async (req, res) => {
    try {
        const accessToken = req.user.accessToken
        const { id } = req.params
        const game = await Game.query().findById(id)
        const playlistTracks = await spotifyClient.getPlaylistTracks(accessToken, game.playlistId)
        const randomSongData = await spotifyClient.getTrackData(accessToken, game.randomSongId)
        return res.status(200).json({ playlistTracks, randomSongData })
    } catch (err) {
        return res.status(500).json({ errors: err.message })
    }
})

export default gameRouter