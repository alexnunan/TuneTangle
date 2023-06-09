import React from "react";

const LoginPage = () => {
    return (
        <div className="login-container">
            <h1 className="title-header">TuneTangle</h1>
            <div className="login-content">
                <h2 className="login-header">How to Play</h2>
                <div className="login-instructions">
                    <p>Sign in or register an account</p>
                    <p>Choose a playlist to play.</p>
                    <p>
                        Guess the song and receive feedback to help you:
                        <ul className="login-feedback-list">
                            <li>The song's title and data will appear green when guessed correctly.</li>
                            <li>The song's artist(s) will appear green if the guessed song's artist matches.</li>
                            <li>The song's album will appear green if the guessed song's album matches.</li>
                            <li>The closest guessed release years will appear to the left and right of the correct release year </li>
                            <li>Popularity, BPM, and Vocal Presence will indicate whether the values need to be higher or lower.</li>
                        </ul>
                    </p>
                    <p>Win by guessing correctly or have nine more attempts.</p>
                </div>
            </div>
            <p className="login-note">Note: TuneTangle is powered by ReactJS and Spotify API integration for a seamless experience.</p>
        </div>
    );
};

export default LoginPage;