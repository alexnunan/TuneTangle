import { Track } from "../../models/index.js"

class TrackSeeder {
    static async seed() {

        const tracks = [{
            title: "Time",
            artist: "Pink Floyd",
            genre: "Classic Rock",
            releaseYear: 1973,
            album: "The Dark Side Of The Moon",
            duration: 413
        },
        {
            title: "Money",
            artist: "Pink Floyd",
            genre: "Classic Rock",
            releaseYear: 1973,
            album: "The Dark Side Of The Moon",
            duration: 382
        },
        {
            title: "Love Me Do",
            artist: "The Beatles",
            genre: "Pop",
            releaseYear: 1963,
            album: "Please Please Me",
            duration: 142
        },
        {
            title: "For No One",
            artist: "The Beatles",
            genre: "Classic Rock",
            releaseYear: 1966,
            album: "Revolver",
            duration: 121
        },
        {
            title: "Warning",
            artist: "The Notorious B.I.G.",
            genre: "Hip-Hop",
            releaseYear: 1994,
            album: "Ready to Die",
            duration: 220
        },
        {
            title: "Nightcall",
            artist: "Kavinsky",
            genre: "Electronic",
            releaseYear: 2011,
            album: "The Lincoln Lawyer",
            duration: 259
        },
        {
            title: "Wouldn't It Be Nice",
            artist: "The Beach Boys",
            genre: "Pop",
            releaseYear: 1966,
            album: "Pet Sounds",
            duration: 153
        },
        {
            title: "For Emily, Wherever I May Find Her",
            artist: "Simon & Garfunkel",
            genre: "Folk",
            releaseYear: 1966,
            album: "Parsley, Sage, Rosemary and Thyme",
            duration: 127
        },
        {
            title: "Homeward Bound",
            artist: "Simon & Garfunkel",
            genre: "Folk",
            releaseYear: 1966,
            album: "Parsley, Sage, Rosemary and Thyme",
            duration: 149
        },
        {
            title: "House of the Rising Sun",
            artist: "The Animals",
            genre: "Blues",
            releaseYear: 1964,
            album: "The Animals",
            duration: 272
        },
        {
            title: "Time after Time",
            artist: "Cyndi Lauper",
            genre: "Pop",
            releaseYear: 1983,
            album: "She's So Unusual",
            duration: 296
        },
        {
            title: "Devil In a New Dress",
            artist: "Kanye West",
            genre: "Rap",
            releaseYear: 2010,
            album: "My Beautiful Dark Twisted Fantasy",
            duration: 351
        },
        {
            title: "Power",
            artist: "Kanye West",
            genre: "Rap",
            releaseYear: 2010,
            album: "My Beautiful Dark Twisted Fantasy",
            duration: 293
        },
        {
            title: "Here Comes the Rain Again",
            artist: "Eurythmics",
            genre: "Pop",
            releaseYear: 1983,
            album: "Touch",
            duration: 302
        }]

        for (const track of tracks) {
            const inDB = await Track.query().findOne( { title: track.title, artist: track.artist } )
            if (!inDB) {
                await Track.query().insert(track)
            }
        }
    }
}

export default TrackSeeder