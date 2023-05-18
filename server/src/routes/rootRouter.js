import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import guessRouter from "./api/v1/guessRouter.js"
import authSpotifyRouter from "./authSpotifyRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/api/v1/guess", guessRouter)
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/auth/spotify", authSpotifyRouter)
rootRouter.use("/", clientRouter);

export default rootRouter;
