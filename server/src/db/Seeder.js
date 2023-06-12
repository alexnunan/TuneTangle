/* eslint-disable no-console */
import { connection } from "../boot.js"
import {Playlist} from "../models/index.js"

class Seeder {
  static async seed() {
    await Playlist.query().insertAndFetch({
      name: "All Out 50s",
      playlistTotal: 150,
      playlistId: "37i9dQZF1DWSV3Tk4GO2fq"
    })

    await Playlist.query().insertAndFetch({
      name: "All Out 60s",
      playlistTotal: 150,
      playlistId: "37i9dQZF1DXaKIA8E7WcJj"
    })

    await Playlist.query().insertAndFetch({
      name: "All Out 70s",
      playlistTotal: 150,
      playlistId: "37i9dQZF1DWTJ7xPn4vNaz"
    })

    await Playlist.query().insertAndFetch({
      name: "All Out 80s",
      playlistTotal: 150,
      playlistId: "37i9dQZF1DX4UtSsGT1Sbe"
    })

    await Playlist.query().insertAndFetch({
      name: "All Out 90s",
      playlistTotal: 150,
      playlistId: "37i9dQZF1DXbTxeAdrVG2l"
    })

    await Playlist.query().insertAndFetch({
      name: "All Out 2000s",
      playlistTotal: 150,
      playlistId: "37i9dQZF1DX4o1oenSJRJd"
    })

    await Playlist.query().insertAndFetch({
      name: "All Out 2010s",
      playlistTotal: 150,
      playlistId: "37i9dQZF1DX5Ejj0EkURtP"
    })

    await Playlist.query().insertAndFetch({
      name: "VH1's Top 100 Rock Songs of All Time",
      playlistTotal: 100,
      playlistId: "1Bpj8bxzKmC1XrKS8mWGLR"
    })

    await Playlist.query().insertAndFetch({
      name: "Classic Rock Drive",
      playlistTotal: 150,
      playlistId: "37i9dQZF1DXdOEFt9ZX0dh"
    })

    await Playlist.query().insertAndFetch({
      name: "Old School Rap Mix",
      playlistTotal: 50,
      playlistId: "37i9dQZF1EIhoSaISLaaJc"
    })

    await Playlist.query().insertAndFetch({
      name: "I Love My '90s R&B",
      playlistTotal: 75,
      playlistId: "37i9dQZF1DX6VDO8a6cQME"
    })

    await Playlist.query().insertAndFetch({
      name: "I Love My '90s R&B",
      playlistTotal: 75,
      playlistId: "37i9dQZF1DX6VDO8a6cQME"
    })

    await Playlist.query().insertAndFetch({
      name: "Hip-Hop Favourites",
      playlistTotal: 100,
      playlistId: "37i9dQZF1DX48TTZL62Yht"
    })

    await Playlist.query().insertAndFetch({
      name: "Top 50 Funk Hits",
      playlistTotal: 50,
      playlistId: "5OHvSXMjGR0uLscJgDiEuJ"
    })

    await Playlist.query().insertAndFetch({
      name: "Jazz Classics",
      playlistTotal: 200,
      playlistId: "37i9dQZF1DXbITWG1ZJKYt"
    })
    
    await Playlist.query().insertAndFetch({
      name: "Top 500 Alternative Rock Songs of All Time",
      playlistTotal: 476,
      playlistId: "0ZmuHm9d36CWE71AKiAdsr"
    })

    await Playlist.query().insertAndFetch({
      name: "Essential Folk",
      playlistTotal: 114,
      playlistId: "37i9dQZF1DWVmps5U8gHNv"
    })

    await Playlist.query().insertAndFetch({
      name: "Every Beatles Song, In Order",
      playlistTotal: 210,
      playlistId: "6B0cuxgKxkLGzpfWr6R886"
    })

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder