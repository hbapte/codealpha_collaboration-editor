import { Request, Response } from "express";
import * as documentRepository from "./documentRepository";

export const getDocument = async (req: Request, res: Response) => {
  try {
    const document = await documentRepository.getDocumentById(req.params.id);
    if (!document) return res.status(404).json({ message: "Document not found" });
    res.json(document);
  } catch (err) {
    res.status(500).json({ message: (err as any).message });
  }
};

export const saveDocument = async (req: Request, res: Response) => {
  try {
    const document = await documentRepository.saveDocument(req.params.id, req.body.content);
    res.json(document);
  } catch (err) 
  {
    res.status(500).json({ message: (err as any).message });
  }
};
