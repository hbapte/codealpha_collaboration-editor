
import { Server } from "socket.io";
import * as documentRepository from "../modules/document/documentRepository";

export const initializeSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-document", async (documentId: string) => {
      const document = await documentRepository.getDocumentById(documentId);
      socket.join(documentId);
      socket.emit("load-document", document?.content);

      socket.on("send-changes", (delta) => {
        socket.broadcast.to(documentId).emit("receive-changes", delta);
      });

      socket.on("save-document", async (content: string) => {
        await documentRepository.saveDocument(documentId, content);
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
