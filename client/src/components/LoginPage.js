import React from "react";

const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="login-content">
                <h2 className="login-header">How to Play</h2>
                <div className="login-instructions">
                    <p>Login with your Spotify account.</p>
                    <p>Choose a playlist to play.</p>
                    <p>
                        Guess the song and receive feedback to help you:
                        <ul className="login-feedback-list">
                            <li>The song's title will appear grayed out until you guess it correctly.</li>
                            <li>When you guess the correct artist, it will be highlighted in yellow.</li>
                            <li>If you guess the correct album, it will be highlighted in green.</li>
                            <li>The release year will be displayed in yellow if your guessed year is within 5 years of the actual release.</li>
                            <li>
                                Genre feedback: The genres of the guessed song will be shown in yellow if they match at least one genre of the random song.
                                They will be shown in green if all the genres match.
                            </li>
                        </ul>
                    </p>
                    <p>Win by guessing correctly or have nine more attempts.</p>
                </div>
            </div>
            <p className="login-note">Note: TuneTangle is powered by ReactJS and Spotify API integration for a seamless experience.</p>
            <div className="login-button-container">
                <a href="/auth/spotify/callback" className="login-button">Sign In With Spotify</a>
            </div>
        </div>
    );
};

export default LoginPage;