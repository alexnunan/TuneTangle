import express from "express";
import { Game } from "../../../models/index.js";
import spotifyClient from "../../../apiClient/spotifyClient.js";

const gameRouter = new express.Router()

gameRouter.post("/", async (req, res) => {
    try {
        const userId = req.user.spotifyId
        const { body } = req
        const selectedPlaylistId = body.playlistId
        const accessToken = req.user.accessToken
        
        const randomSongId = await spotifyClient.getRandomTrackIdByPlaylist(accessToken, selectedPlaylistId)

        const newGame = await Game.query().insertAndFetch({spotifyId: userId, playlistId: selectedPlaylistId, randomSongId: randomSongId})
        
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

        return res.status(200).json({ playlistTracks : playlistTracks })
    } catch (err) {
        return res.status(500).json({ errors: err.message })
    }
})

export default gameRouter