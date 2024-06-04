import express from "express"
import { errorHandler } from './middlewares/errorHandler.js';
import { expressLogger } from "./middleware/logger.middleware.js"
import mainRouter from "./routes/index.router.js"

const app = express();

app.use(express.json())

app.use('/auth', mainRouter);

app.use(expressLogger)

app.use(errorHandler);

export default app;