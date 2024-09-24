// src/modules/document/document.repository.ts
import { Document } from "../../database/models/Document";

export const getDocumentById = async (id: string) => {
  return await Document.findById(id);
};

export const saveDocument = async (id: string, content: string) => {
  return await Document.findByIdAndUpdate(id, { content }, { new: true });
};

export const createDocument = async (content: string) => {
  const newDocument = new Document({ content });
  return await newDocument.save();
};
