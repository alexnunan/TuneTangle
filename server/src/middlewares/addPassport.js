import passport from "passport";
import strategy from "../authentication/passportStrategy.js";
import deserializeUser from "..//authentication/deserializeUser.js";
import dotenv from "dotenv";
import { User } from "../models/index.js";
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import got from 'got';

dotenv.config();

const addPassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};

passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

const spotifyHandler = async (accessToken, refreshToken, expires_in, profile, done) => {
  User.query().findOne({ spotifyId: profile.id }).then(async (user) => {
    if (user) {
        try {
          const response = await got.post('https://accounts.spotify.com/api/token', {
            form: {
              grant_type: 'refresh_token',
              refresh_token: refreshToken,
              client_id: process.env.SPOTIFY_CLIENT_ID,
              client_secret: process.env.SPOTIFY_CLIENT_SECRET,
            },
            responseType: 'json',
          });
  
          const newAccessToken = response.body.access_token;
          await User.query().findById(user.id).patch({ accessToken: newAccessToken });
        
        } catch (error) {
          return done(error);
      }
  
      return done(null, user);
    }
  
    // Create a new user in the database
    User.query().insertAndFetch({ 
      spotifyId: profile.id, 
      accessToken: accessToken,
      refreshToken: refreshToken,
    }).then((user) => {
      return done(null, user);
    }).catch((error) => {
      return done(error);
    });
  });
};

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