import express from "express";
import spotifyClient from "../../../apiClient/spotifyClient.js"

const playlistSelectionRouter = new express.Router()

playlistSelectionRouter.get("/", async (req, res) => {
    try {
        const accessToken = req.user.accessToken
        const userPlaylists = await spotifyClient.getUserPlaylistIds(accessToken)
        return res.status(200).json({ userPlaylists: userPlaylists })
    } catch (err) {
        return res.status(500).json({ errors: err.message })
    }
})

export default playlistSelectionRouter