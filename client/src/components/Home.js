import React, { useState } from "react";

const Home = () => {

    const [songSearch, setSongSearch] = useState("")

    const handleInputChange = event => {
        setSongSearch(event.currentTarget.value)
    }

    return (
        <div>
            <h1 className="home-header">Tune Tangle</h1>
            <form className="song-search">
                <label>
                    Enter a song:
                    <input
                        type="text"
                        name="songSearch"
                        onChange={handleInputChange}
                        value={songSearch}
                    />
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default Home