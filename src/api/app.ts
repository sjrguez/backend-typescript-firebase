import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";

// App Middleware
import { NotFoundMiddleware } from '../api/middleware'

export const routerApp = ({ TaskRoutes }: any) => {
    const router = express.Router();
    const apiRouter = express.Router();

    apiRouter
        .use(bodyParser.urlencoded({ limit: "5mb", extended: true }))
        .use(bodyParser.json({ limit: "5mb"}))
        .use(cors())
        .use(helmet())
        .use(compression())


    // All Routes App
    apiRouter.use('/tasks', TaskRoutes) 

    // Main Routes
    router.use("/v1/api", apiRouter)

    // Middleware
    router.use(NotFoundMiddleware)

    return router;
}