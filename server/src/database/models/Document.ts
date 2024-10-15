import mongoose, { Schema, Document as MongooseDocument } from 'mongoose';

interface Document extends MongooseDocument {
  content: string;
  owner: mongoose.Schema.Types.ObjectId;
  collaborators: mongoose.Schema.Types.ObjectId[];
}


const documentSchema = new mongoose.Schema({
  _id: String,
  content: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  versions: [{
    content: String,
    timestamp: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }]
});

export const Document = mongoose.model('Document', documentSchema);

const DocumentModel = mongoose.model<Document>('Document', documentSchema);
export default DocumentModel;
