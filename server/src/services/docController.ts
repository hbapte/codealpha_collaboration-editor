import { Socket } from 'socket.io';
import { findOrCreateDocument, updateDocument, checkDocumentAccess } from './docRep';

export const handleGetDocument = async (socket: Socket, documentId: string) => {
    if (!socket.user) {
      return socket.emit('error', 'User not authenticated');
    }
    const document = await findOrCreateDocument(documentId, socket.user.userId);
    if (!checkDocumentAccess(document, socket.user.userId)) {
      return socket.emit('error', 'Not authorized to access this document');
    }
    socket.emit('loadDocument', document.content);
  };

export const handleDocumentChange = async (socket: Socket, data: { documentId: string, content: string }) => {
  const { documentId, content } = data;
  if (!socket.user) {
    return socket.emit('error', 'User not authenticated');
  }
  const document = await findOrCreateDocument(documentId, socket.user.userId);
  if (!checkDocumentAccess(document, socket.user.userId)) {
    return socket.emit('error', 'Not authorized to edit this document');
  }
  await updateDocument(documentId, content);
  socket.broadcast.emit('documentUpdate', content);
};