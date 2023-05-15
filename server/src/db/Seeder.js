/* eslint-disable no-console */
import { connection } from "../boot.js"
import TrackSeeder from "./seeders/trackSeeder.js"

class Seeder {
  static async seed() {

    console.log("Seeding tracks...")
    await TrackSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder