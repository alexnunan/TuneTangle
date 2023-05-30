import got from "got"

class spotifyClient {

    static async getUserPlaylistIds(accessToken) {
        try {
            const url = `https://api.spotify.com/v1/me/playlists`
            const apiResponse = await got(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const responseParsed = await JSON.parse(apiResponse.body)
            const responseItems = responseParsed.items
            const returnedPlaylists = []
            responseItems.forEach(playlist => {
                if (playlist.tracks.total > 25) {
                    returnedPlaylists.push({
                        name: playlist.name,
                        spotifyId: playlist.id
                    })
                }
            })
            return returnedPlaylists
        } catch (err) {
            console.log(err.message)
            return { errors: err.message }
        }
    }

    static async getRandomTrackIdByPlaylist(accessToken, playlistId) {
        try {
            const url = `https://api.spotify.com/v1/playlists/${playlistId}`
            const apiResponse = await got(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const responseParsed = await JSON.parse(apiResponse.body)
            const trackList = responseParsed.tracks.items
            const randomTrack = trackList[Math.floor(Math.random()*trackList.length)]
            return randomTrack.track.id
        } catch (err) {
            console.log(err.message)
            return { errors: err.message }
        }
    }

    static async getPlaylistTracks(accessToken, playlistId) {
        try {
            const url = `https://api.spotify.com/v1/playlists/${playlistId}`
            const apiResponse = await got(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const responseParsed = await JSON.parse(apiResponse.body)
            const trackList = responseParsed.tracks.items
            const playlistTracks = []
            trackList.forEach(item => {
                playlistTracks.push({
                    title: item.track.name,
                    id: item.track.id
                })
            })
            return playlistTracks
        } catch (err) {
            console.log(err.message)
            return { errors: err.message }
        }
    }

    static async getTrackData(accessToken, trackId) {
        try {
            const basicDataUrl = `https://api.spotify.com/v1/tracks/${trackId}`
            const apiResponseBasic = await got(basicDataUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const basicData = await JSON.parse(apiResponseBasic.body)

            const advancedDataUrl = `https://api.spotify.com/v1/audio-features/${trackId}`
            const apiResponseAdvanced = await got(advancedDataUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const advancedData = await JSON.parse(apiResponseAdvanced.body)

            const artistNames = basicData.artists.map(artist => {
                return artist.name
            })
            const artistIds = basicData.artists.map(artist => {
                return artist.id
            })

            const albumDataUrl = `https://api.spotify.com/v1/albums/${basicData.album.id}`
            const albumResponse = await got(albumDataUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const albumData = await JSON.parse(albumResponse.body)

            const artistDataUrl = `https://api.spotify.com/v1/artists/${artistIds[0]}`
            const artistResponse = await got(artistDataUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const artistData = await JSON.parse(artistResponse.body)
            const artistGenres = artistData.genres
            let genres = []
            if (albumData.genres.length >= 1) {
                albumData.genres.forEach(genre => {
                    genres.push(genre)
                })
            } else if (artistGenres.length >=1) {
                artistGenres.forEach(genre => {
                    genres.push(genre)
                })                
            } else {
                genres.push("Spotify has not added any genres to this track")
            }

            let dateArray = basicData.album.release_date.split("-")
            let releaseYear = dateArray[0]
            
            releaseYear = parseInt(releaseYear)

            const trackObject = {
                title: basicData.name,
                artist: artistNames,
                album: basicData.album.name,
                releaseYear: releaseYear,
                duration: basicData.duration_ms,
                trackUrl: basicData.external_urls.spotify,
                imageUrl: basicData.album.images[0].url,
                popularity: basicData.popularity, // 100 is the most popular song on spotify
                danceability: advancedData.danceability, // accounts for tempo, rhythm stability, bear strength, overall regularity
                energy: advancedData.energy, // accounts for dynamic range, perceived loudness, timre, onset rate, and general entropy
                loudness: advancedData.loudness, //average decibals
                tempo: advancedData.tempo, // BPM
                valence: advancedData.valence, //positivity - High is happy
                instrumentalness: advancedData.instrumentalness, // if .5 < inst, no vocals, if 1, very high confidence
                genres: genres
            }
            return trackObject
        } catch (err) {
            console.log(err.message)
            return { errors: err.message }
        }
    }
}

export default spotifyClient