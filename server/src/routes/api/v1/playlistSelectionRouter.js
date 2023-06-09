import express from "express";
import { Playlist } from "../../../models/index.js";

const playlistSelectionRouter = new express.Router()

playlistSelectionRouter.get("/", async (req, res) => {
    try {
        const playlists = await Playlist.query()
        return res.status(200).json({ playlists: playlists })
    } catch (err) {
        return res.status(500).json({ errors: err.message })
    }
})

export default playlistSelectionRouter