import { Server } from "socket.io";
import http from "http";
import express from "express";

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});
const userSocketMap = {}; // { userId: socketId }
export const getRecieverSocketId = (recieverId) => {
  return userSocketMap[recieverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;
  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
