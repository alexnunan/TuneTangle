import got from "got"

class spotifyClient {
    static async getSearchTracks(searchValue, accessToken) {
        try {
            const url = `https://api.spotify.com/v1/search?q=track:${searchValue}&type=track`
            const apiResponse = await got(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const responseParsed = await JSON.parse(apiResponse.body)
            const returnedTracks = responseParsed.tracks.items
            console.log(`     
            `)
            returnedTracks.forEach(track => {
                console.log(track.name)
            })
            return apiResponse
        } catch (err) {
            console.log(err.message)
            return { errors: err.message }
        }
    }

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
                if (playlist.tracks.total > 50) {
                    returnedPlaylists.push(playlist.name)
                }
            })
            return returnedPlaylists
        } catch (err) {
            console.log(err.message)
            return { errors: err.message }
        }
    }
}

export default spotifyClient