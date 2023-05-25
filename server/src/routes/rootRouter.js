import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import authSpotifyRouter from "./authSpotifyRouter.js";
import playlistSelectionRouter from "./api/v1/playlistSelectionRouter.js"
import gameRouter from "./api/v1/gameRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/api/v1/game", gameRouter)
rootRouter.use("/api/v1/playlistSelection", playlistSelectionRouter)
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/auth/spotify", authSpotifyRouter)
rootRouter.use("/", clientRouter);

export default rootRouter;
