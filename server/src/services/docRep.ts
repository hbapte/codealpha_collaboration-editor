import DocumentModel from "../database/models/Document";

export const findOrCreateDocument = async (documentId: string, userId: string) => {
  let document = await DocumentModel.findById(documentId);
  if (!document) {
    document = await DocumentModel.create({ _id: documentId, content: '', owner: userId });
  }
  return document;
};

export const updateDocument = async (documentId: string, content: string) => {
  return await DocumentModel.findByIdAndUpdate(documentId, { content });
};

export const checkDocumentAccess = (document: any, userId: string) => {
  return document.owner.toString() === userId || document.collaborators.includes(userId);
};