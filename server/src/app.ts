import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import "./config/db"; 
import mongoose from 'mongoose';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;


const documentSchema = new mongoose.Schema({
  _id: String,
  content: String,
});

const Document = mongoose.model('Document', documentSchema);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('getDocument', async (documentId: string) => {
    let document = await Document.findById(documentId);
    if (!document) {
      document = await Document.create({ _id: documentId, content: '' });
    }
    socket.emit('loadDocument', document.content);
  });

  socket.on('documentChange', async (data: { documentId: string, content: string }) => {
    await Document.findByIdAndUpdate(data.documentId, { content: data.content }, { upsert: true });
    socket.broadcast.emit('documentUpdate', data.content);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));