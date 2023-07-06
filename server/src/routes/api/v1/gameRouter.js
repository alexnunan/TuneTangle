import express from "express";
import { Game, User } from "../../../models/index.js";
import spotifyClient from "../../../apiClient/spotifyClient.js";
import gameGuessRouter from "./gameGuessRouter.js";

const gameRouter = new express.Router()
gameRouter.use("/:id/guess", gameGuessRouter)

gameRouter.post("/", async (req, res) => {
    try {
        if( req.user ) {
            const refreshToken = req.user.refreshToken
            const accessToken = await spotifyClient.getNewAccessToken(refreshToken)
            const { body } = req
            const selectedPlaylistId = body.playlistId
            const trackTotal = body.trackTotal
            const randomSongId = await spotifyClient.getRandomTrackIdByPlaylist(accessToken, selectedPlaylistId, trackTotal)
            const newGame = await Game.query().insertAndFetch({playlistId: selectedPlaylistId, randomSongId: randomSongId, playlistTotal: trackTotal})
    
            return res.status(200).json({ newGameId : newGame.id })
        } else {
            const refreshToken = 'AQCmgEF129Jq5W0FrAUmkYl36geGHDtTv1EyiCD85xRVT5yMA9OGWZiTyFLg_vTtUD_I44P8ZpznNwLzG7XV3vbyB6FBf1rAiEuabmuIMmqC7chZaNYCX7zOIzPOqxLsoug'
            const accessToken = await spotifyClient.getNewAccessToken(refreshToken)
            const { body } = req
            const selectedPlaylistId = body.playlistId
            const trackTotal = body.trackTotal
            const randomSongId = await spotifyClient.getRandomTrackIdByPlaylist(accessToken, selectedPlaylistId, trackTotal)
            const newGame = await Game.query().insertAndFetch({playlistId: selectedPlaylistId, randomSongId: randomSongId, playlistTotal: trackTotal})
    
            return res.status(200).json({ newGameId : newGame.id })
        }
    } catch (err) {
        return res.status(500).json({ errors: err.message })
    }
})

gameRouter.get("/:id", async (req, res) => {
    
    try {
        let refreshToken
        if (req.user) {
            refreshToken = req.user.refreshToken
        } else {
            refreshToken = 'AQCmgEF129Jq5W0FrAUmkYl36geGHDtTv1EyiCD85xRVT5yMA9OGWZiTyFLg_vTtUD_I44P8ZpznNwLzG7XV3vbyB6FBf1rAiEuabmuIMmqC7chZaNYCX7zOIzPOqxLsoug'
        }
        const accessToken = await spotifyClient.getNewAccessToken(refreshToken)
        const { id } = req.params
        const game = await Game.query().findById(id)
        const playlistTracks = await spotifyClient.getPlaylistTracks(accessToken, game.playlistId, game.playlistTotal)
        const randomSongData = await spotifyClient.getTrackData(accessToken, game.randomSongId)
        return res.status(200).json({ playlistTracks, randomSongData })
    } catch (err) {
        return res.status(500).json({ errors: err.message })
    }
})

export default gameRouter