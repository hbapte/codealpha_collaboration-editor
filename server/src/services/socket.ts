// server\src\services\socket.ts
import { Server } from 'socket.io';
import http from 'http';
import { ACTIONS } from './actions';

const documents: { [key: string]: string } = {}; // Store document content in memory
const userSocketMap: { [key: string]: string } = {}; // Map for tracking socket to user connections

export const initializeSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Your client URL
      methods: ["GET", "POST"],
      credentials: true, 
    },

  });


  io.on('connection', (socket) => {
    console.info(`Socket connected: ${socket.id}`);

    // Joining the document room
    socket.on(ACTIONS.JOIN_DOCUMENT, (documentId: string) => {
      socket.join(documentId);
      userSocketMap[socket.id] = documentId;
      console.log(`Socket ${socket.id} joined document ${documentId}`);

      // Load the document content if it exists, otherwise default to empty
      const documentContent = documents[documentId] || "<p><br></p>";
      socket.emit(ACTIONS.LOAD_DOCUMENT, documentContent);
    });

    // Handling real-time document changes
    socket.on(ACTIONS.SEND_CHANGES, ({ delta, senderId, documentId }) => {
      console.log(`Changes received from ${senderId} for document ${documentId}`);
      // Broadcast changes to all users except the sender
      socket.to(documentId).emit(ACTIONS.RECEIVE_CHANGES, { delta, senderId });
    });

    // Save document content periodically
    socket.on(ACTIONS.SAVE_DOCUMENT, ({ documentId, content }) => {
      console.log(`Saving document ${documentId}`);
      documents[documentId] = content; // Save content to in-memory storage (replace with DB logic)
    });

    // Handle socket disconnection
    socket.on('disconnecting', () => {
      console.info(`Socket ${socket.id} disconnecting`);
      const documentId = userSocketMap[socket.id];
      if (documentId) {
        socket.leave(documentId);
        delete userSocketMap[socket.id];
      }
    });

    // Handle any socket errors
    socket.on('error', (err) => {
      console.error(`Socket error: ${err}`);
    });
  });

  return io;
};
