// src/components/NewDocumentButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NewDocumentButton: React.FC = () => {
  const navigate = useNavigate();

  const createNewDocument = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: " " }), 
      });
        
      
      const { documentId } = await response.json();
      console.log("Created new document with ID:", documentId);
      navigate(`/document/${documentId}`); 
    } catch (error) {
      console.error("Error creating new document:", error);
    }
  };

  return (
    <button onClick={createNewDocument}>
      Create New Document
    </button>
  );
};

export default NewDocumentButton;
