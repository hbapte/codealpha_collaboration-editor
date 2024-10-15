import "./App.css";
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import io, { Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:5000');

const App: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [documentId, setDocumentId] = useState<string>('default-doc');

  useEffect(() => {
    socket.emit('getDocument', documentId);

    socket.on('loadDocument', (loadedContent: string) => {
      setContent(loadedContent);
    });

    socket.on('documentUpdate', (updatedContent: string) => {
      setContent(updatedContent);
    });

    return () => {
      socket.off('loadDocument');
      socket.off('documentUpdate');
    };
  }, [documentId]);

  const handleChange = (value: string) => {
    setContent(value);
    socket.emit('documentChange', { documentId, content: value });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Collaborative Doc Editor</h1>
        <div className="mb-4">
          <label htmlFor="documentId" className="block text-sm font-medium text-gray-700">Document ID:</label>
          <input
            type="text"
            id="documentId"
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="border border-gray-300 rounded-md">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleChange}
            modules={modules}
            formats={formats}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
