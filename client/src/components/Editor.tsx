// client\src\components\Editor.tsx
import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { getSocket } from "../services/socket";
import { useParams } from "react-router-dom";
import { getOrCreateUserId } from '../utils/userUtils'; // Import your user ID function
import { ACTIONS } from './actions'; // Import your actions

const SAVE_INTERVAL_MS = 2000;

const Editor: React.FC = () => {
  const { id: documentId } = useParams<{ id: string }>();
  const [quill, setQuill] = useState<Quill | null>(null);
  const userId = getOrCreateUserId(); // Get unique user ID

  // Effect to join document room and load initial content
  useEffect(() => {
    const socket = getSocket();

    if (!socket) {
      console.error("Socket not initialized");
      return;
    }

    // Emit event to join document room
    socket.emit(ACTIONS.JOIN_DOCUMENT, documentId);

    // Listen for document content to be loaded
    socket.once(ACTIONS.LOAD_DOCUMENT, (documentContent: string) => {
      console.log("Document content loaded:", documentContent); // Debugging
      if (quill) {
        // Load document content into the editor
        quill.root.innerHTML = documentContent || "<p><br></p>"; // Default to empty if null
        quill.enable(); // Enable editor after loading content
      }
    });

    // Handle receiving changes from other users
    const handleReceiveChanges = (data: { delta: any; senderId: string }) => {
      if (data.senderId !== userId) { // Only apply changes from others
        console.log("Received changes:", data.delta); // Debugging
        quill?.updateContents(data.delta, 'api');
      }
    };

    // Set up listener for receiving changes
    socket.on(ACTIONS.RECEIVE_CHANGES, handleReceiveChanges);

    return () => {
      // Cleanup listeners on unmount
      socket.off(ACTIONS.RECEIVE_CHANGES, handleReceiveChanges);
    };
  }, [documentId, quill, userId]);

  // Effect to handle text changes and emit changes via Socket.io
  useEffect(() => {
    const socket = getSocket();
    if (!quill || !socket) return;

    // Function to handle text changes in Quill
    const handleTextChange = (delta: any) => {
      console.log("Text changed:", delta); // Debugging
      socket.emit(ACTIONS.SEND_CHANGES, { delta, senderId: userId, documentId });
    };

    // Listen for text changes in Quill
    quill.on("text-change", handleTextChange);

    return () => {
      // Cleanup listener on unmount
      quill.off("text-change", handleTextChange);
    };
  }, [quill, documentId, userId]);

  // Effect to periodically save the document content
  useEffect(() => {
    const socket = getSocket();
    if (!quill || !socket) return;

    // Periodically send save requests
    const interval = setInterval(() => {
      const content = quill.root.innerHTML;
      console.log("Saving document:", content); // Debugging
      socket.emit(ACTIONS.SAVE_DOCUMENT, { documentId, content });
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval); // Clear interval on unmount
    };
  }, [quill, documentId]);

  // Initialize Quill editor
  const editorContainerRef = useCallback((container: HTMLDivElement) => {
    if (container && !quill) {
      const q = new Quill(container, {
        theme: "snow",
        modules: { toolbar: true }, // Add toolbar module for rich text editing
      });
      q.disable(); // Disable editor until content is loaded
      setQuill(q); // Set Quill instance
    }
  }, [quill]);

  return <div className="editor" ref={editorContainerRef}></div>;
};

export default Editor;
