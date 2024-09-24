import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import "./config/db";
import cors from "cors";
import indexRouter from "./routes/index";
const cookieParser = require('cookie-parser');
import { Server } from "socket.io";
import http from "http";
import { logger } from "./middleware/logger";
import { initializeSocket } from "./services/socket";

dotenv.config(); 
const port = process.env.PORT;
const app: Express = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(logger);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Welcome to Live Collaboration API!');
});

app.use('/api', indexRouter);

initializeSocket(io);

app.use((req: Request, res: Response) => {
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;