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
            console.log(trackList)
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
}

export default spotifyClient