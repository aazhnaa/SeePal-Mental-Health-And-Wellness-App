// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));
// const server = http.createServer(app);

// const io = new Server(server,{
//     cors:{
//         origin:['http://localhost:5173'],
//     }
// })

// export function getReceiverSocketId(userId){
//     return userSocketMap[userId]
// }
// //for online users
// const userSocketMap = {} 

// io.on("connection", (socket) => {
//     //console.log('A user connected')
//     const userId = socket.handshake.query.userId;

//     //adding user to online users
//     if(userId) userSocketMap[userId] = socket.id

//     //broadcasting online users
//     io.emit("getOnlineUsers",Object.keys(userSocketMap))

//     socket.on("disconnect",()=>{
//         //console.log("A User Disconnected", socket.id);
//         //removing user from online users
//         delete userSocketMap[userId];
//         //broadcasting online users
//         io.emit("getOnlineUsers",Object.keys(userSocketMap));
//     })
// });

// export {app, server, io};


// src/lib/socket.js

import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const userSocketMap = {}; // { userId: socketId }

export const initSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            credentials: true
        }
    });

    // --- Add Socket.IO Authentication Middleware (Crucial for Security) ---
    io.use((socket, next) => {
        cookieParser()(socket.request, {}, (err) => {
            if (err) return next(new Error("Cookie Parser Error"));

            const token = socket.request.cookies.jwt; // Or your cookie name

            if (!token) return next(new Error("Authentication Error: No token"));

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) return next(new Error("Authentication Error: Invalid token"));
                socket.user = decoded; // Attach user payload to the socket
                next();
            });
        });
    });

    io.on("connection", (socket) => {
        // Now we get the userId from the authenticated token, not the query
        const userId = socket.user.userId;
        
        if (userId) userSocketMap[userId] = socket.id;

        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnect", () => {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });
};

export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
};