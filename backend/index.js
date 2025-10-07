// import express from "express"
// import dotenv from 'dotenv'
// dotenv.config()
// import { connectDB } from "./src/lib/connectionDB.js"
// import authRouter from './src/routes/user.routes.js'
// import messageRouter from './src/routes/message.routes.js'
// import postRouter from './src/routes/post.routes.js'
// import moodRouter from './src/routes/mood.routes.js'
// import journalRouter from './src/routes/journal.routes.js'
// import aiRouter from './src/routes/ai.routes.js'
// import {app, server} from "./src/lib/socket.js"
// const PORT = process.env.PORT

// app.use(express.json())
// app.use("/api",authRouter)
// app.use("/api/messages",messageRouter)
// app.use("/api/posts",postRouter)
// app.use("/api/mood", moodRouter)
// app.use("/api/bot", aiRouter)
// app.use("/api/entry", journalRouter)


// connectDB()
//     .then(() => {
//         server.listen(PORT, () => {
//             console.log(`✅ Server is running on PORT: ${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.error("❌ Failed to connect to MongoDB", err);
//         process.exit(1); // Exit the process with an error code
//     });



import express from "express";
import http from "http";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from "./src/lib/connectionDB.js";
import { initSocketServer } from "./src/lib/socket.js";
import authRouter from './src/routes/user.routes.js';
import messageRouter from './src/routes/message.routes.js'
import postRouter from './src/routes/post.routes.js'
import moodRouter from './src/routes/mood.routes.js'
import journalRouter from './src/routes/journal.routes.js'
import aiRouter from './src/routes/ai.routes.js'

dotenv.config();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO by passing it the HTTP server
const io = initSocketServer(server);
app.use((req, res, next) => {
    req.io = io;
    next();
});

const PORT = process.env.PORT || 8000;

// --- Apply ALL Middleware Here ---

app.use(cors({
    //origin: process.env.FRONTEND_URL,
    origin : 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// --- API Routes ---
app.use("/api", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/posts", postRouter);
app.use("/api/mood", moodRouter);
app.use("/api/bot", aiRouter);
app.use("/api/entry", journalRouter);

// --- Server Startup ---
connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`✅ Server is running on PORT: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to connect to MongoDB", err);
        process.exit(1);
    });