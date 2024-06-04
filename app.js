import express from "express"
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json())


app.use('/auth', authRoutes);

app.use(errorHandler);

export default app;