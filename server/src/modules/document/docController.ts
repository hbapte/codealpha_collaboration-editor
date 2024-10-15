import { Request, Response } from 'express';
import DocumentModel from '../../database/models/Document';
import { AuthenticatedRequest } from '../../types';

export const getDocuments = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const documents = await DocumentModel.find({
      $or: [{ owner: req.user?.userId }, { collaborators: req.user?.userId }]
    });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents' });
  }
};

export const createDocument = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { content } = req.body;
    const document = new DocumentModel({
      content,
      owner: req.user?.userId,
      collaborators: []
    });
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error creating document' });
  }
};
