// server/server.js
const http = require("http");
const server = http.createServer((req, res) => {
  // Handle HTTP requests if needed
});

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

console.log("Init socketio");
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle chat messages
  socket.on("foo", async (message) => {
    io.emit("foo", message); // Broadcast the message to all connected clients
    console.log("Message received");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3001, () => {
  console.log("WebSocket server listening on port 3001");
});
