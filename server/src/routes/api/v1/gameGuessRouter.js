import express from "express";
import spotifyClient from "../../../apiClient/spotifyClient.js";
import { Game, Guess } from "../../../models/index.js"

const gameGuessRouter = new express.Router({mergeParams: true})

gameGuessRouter.post("/", async (req, res) => {
    try {
        const { body } = req
        const trackId = body.trackId
        const gameId = body.gameId
        const refreshToken = req.user.refreshToken
        const accessToken = await spotifyClient.getNewAccessToken(refreshToken)
        const trackGuess = await spotifyClient.getTrackData(accessToken, trackId)
        const game = await Game.query().findById(gameId)
        let guesses = game.guessCount
        guesses = guesses + 1
        await Game.query().findById(gameId).patch({guessCount: guesses})

        const randomSongId = game.randomSongId
        const randomSong = await spotifyClient.getTrackData(accessToken, randomSongId)

        let titleCorrect
        let artistCorrect
        let albumCorrect
        let releaseDateCheck
        let durationCheck
        let popularityCheck
        let danceabilityCheck
        let energyCheck
        let loudnessCheck
        let tempoCheck
        let valenceCheck
        let instrumentalnessCheck
        let winStatus = false

        if (trackId === randomSongId) {
            winStatus = true
        } 

        if(trackGuess.title === randomSong.title) {
            titleCorrect = true
        } else {
            titleCorrect = false
        }
        if (trackGuess.artist[0] === randomSong.artist[0]) {
            artistCorrect = true
        } else {
            artistCorrect = false
        }

        if (trackGuess.album === randomSong.album) {
            albumCorrect = true
        } else {
            albumCorrect = false
        }

        if (trackGuess.releaseDate === randomSong.releaseDate) {
            releaseDateCheck = "match"
        } else if (trackGuess.releaseDate < randomSong.releaseDate) {
            releaseDateCheck = "less"
        } else {
            releaseDateCheck = "more"
        }

        if (trackGuess.duration === randomSong.duration) {
            durationCheck = "match"
        } else if (trackGuess.duration < randomSong.duration) {
            durationCheck = "less"
        } else {
            durationCheck = "more"
        }

        if (trackGuess.popularity === randomSong.popularity) {
            popularityCheck = "match"
        } else if (trackGuess.popularity < randomSong.popularity) {
            popularityCheck = "less"
        } else {
            popularityCheck = "more"
        }

        if (trackGuess.danceability === randomSong.danceability) {
            danceabilityCheck = "match"
        } else if (trackGuess.danceability < randomSong.danceability) {
            danceabilityCheck = "less"
        } else {
            danceabilityCheck = "more"
        }

        if (trackGuess.energy === randomSong.energy) {
            energyCheck = "match"
        } else if (trackGuess.energy < randomSong.energy) {
            energyCheck = "less"
        } else {
            energyCheck = "more"
        }

        if (trackGuess.loudness === randomSong.loudness) {
            loudnessCheck = "match"
        } else if (trackGuess.loudness < randomSong.popularity) {
            loudnessCheck = "less"
        } else {
            loudnessCheck = "more"
        }

        if (trackGuess.tempo === randomSong.tempo) {
            tempoCheck = "match"
        } else if (trackGuess.tempo < randomSong.tempo) {
            tempoCheck = "less"
        } else {
            tempoCheck = "more"
        }

        if (trackGuess.valence === randomSong.valence) {
            valenceCheck = "match"
        } else if (trackGuess.valence < randomSong.valence) {
            valenceCheck = "less"
        } else {
            valenceCheck = "more"
        }

        if (trackGuess.instrumentalness === randomSong.instrumentalness) {
            instrumentalnessCheck = "match"
        } else if (trackGuess.instrumentalness < randomSong.instrumentalness) {
            instrumentalnessCheck = "less"
        } else {
            instrumentalnessCheck = "more"
        }

        let differenceObject = await Guess.query().insertAndFetch({userId: req.user.id, gameId, trackId, titleCorrect, artistCorrect, albumCorrect, releaseDateCheck, durationCheck, popularityCheck, danceabilityCheck, energyCheck, loudnessCheck, tempoCheck, valenceCheck, instrumentalnessCheck})
        trackGuess.differenceObject = differenceObject
        res.status(200).json({trackGuess, winStatus})
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ errors: err.message })
    }
})

export default gameGuessRouter