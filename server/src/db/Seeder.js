/* eslint-disable no-console */
import { connection } from "../boot.js"
import {Playlist} from "../models/index.js"

class Seeder {
  static async seed() {
    await Playlist.query().insertAndFetch({
      name: "Top 100 Rock Tracks on Spotify",
      playlistTotal: 100,
      playlistId: "3qu74M0PqlkSV76f98aqTd"
    })

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder