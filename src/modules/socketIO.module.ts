import { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

type MessageType = {
  content: string;
  id: string;
  isMyMessage: boolean;
};

export function createSocket(app: Express) {
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
    },
  });
  io.on("connection", (socket) => {
    console.log("[socket.io] new connection: " + socket.id);

    socket.on("send-message", (message: string) => {
      console.log("message: " + message);
      const messageToSend: MessageType = {
        content: message,
        id: crypto.randomUUID(),
        isMyMessage: false,
      };
      socket.broadcast.emit("recieve-message", messageToSend); // send everyoneone except sender
    });
  });
  return server;
}
