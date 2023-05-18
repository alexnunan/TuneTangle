import passport from "passport";
import strategy from "../authentication/passportStrategy.js";
import deserializeUser from "..//authentication/deserializeUser.js";
import dotenv from "dotenv"
import { User } from "../models/index.js"
import { Strategy as SpotifyStrategy } from 'passport-spotify'

dotenv.config()

const addPassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};

passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

const spotifyHandler = async (accessToken, refreshToken, expires_in, profile, done) => {
  User.query().findOne({ spotifyId: profile.id }).then((user) => {
    if (user) {
      return done(null, user);
    }

    User.query().insertAndFetch({ 
        spotifyId: profile.id, 
        accessToken: accessToken,
    }).then((user) => {
        return done(null, user);
    })
  }
  )
}

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/spotify/callback'
    },
    spotifyHandler
  )
);

passport.deserializeUser(deserializeUser);

export default addPassport;