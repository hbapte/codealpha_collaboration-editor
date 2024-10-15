// // server\src\modules\document\documentController.ts
// import { Request, Response } from "express";
// import * as documentRepository from "./documentRepository";

// export const getAllDocuments = async (req: Request, res: Response) => {
//     try {
//         const documents = await documentRepository.getAllDocuments();
//         res.json(documents);
//     } catch (err) {
//         res.status(500).json({ message: (err as any).message });
//     }
//     }


// export const getDocument = async (req: Request, res: Response) => {
//   try {
//     const document = await documentRepository.getDocumentById(req.params.id);
//     if (!document) return res.status(404).json({ message: "Document not found" });
//     res.json(document);
//   } catch (err) {
//     res.status(500).json({ message: (err as any).message });
//   }
// };

// export const createDocument = async (req: Request, res: Response) => {
//   try {
//     const document = await documentRepository.createDocument(req.body.content);
//     res.json({ documentId: document._id });
//   } catch (err) {
//     res.status(500).json({ message: (err as any).message });
//   }
// };

// export const saveDocument = async (req: Request, res: Response) => {
//   try {
//     const document = await documentRepository.saveDocument(req.params.id, req.body.content);
//     res.json(document);
//   } catch (err) 
//   {
//     res.status(500).json({ message: (err as any).message });
//   }
// };

// export const deleteDocument = async (req: Request, res: Response) => {
//   try {
//     const document = await documentRepository.deleteDocument(req.params.id);
//     res.json(document);
//   } catch (err) {
//     res.status(500).json({ message: (err as any).message });
//   }
// };
