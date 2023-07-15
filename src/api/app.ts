import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";

// App Middleware


export const routerApp = ({}) => {
    const router = express.Router();
    const apiRouter = express.Router();

    apiRouter
        .use(bodyParser.urlencoded({ limit: "5mb", extended: true }))
        .use(bodyParser.json({ limit: "5mb"}))
        .use(cors())
        .use(helmet())
        .use(compression())


    // All Routes App


    // Main Routes
    router.use("/v1/api", apiRouter)

    // Middleware


    return router;
}