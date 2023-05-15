/* eslint-disable no-console */
import { connection } from "../boot.js"
import { Track } from "../models/index.js"

class Seeder {
  static async seed() {
    await Track.query().insert({ title: "Time", artist: "Pink Floyd", genre: "Classic Rock", releaseYear: 1973, album: "The Dark Side Of The Moon", duration: 413 })

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder