# Collaborative Rich Doc Editor

A real-time collaborative rich text editor built with React, Express, Socket.IO, and MongoDB. This application allows multiple users to edit documents simultaneously, with features like real-time cursor tracking and persistent document storage.

## Features

- Real-time collaborative editing
- Rich text formatting using Quill editor
- Live cursor tracking for multiple users
- Document persistence with MongoDB
- Simple user identification system
- Ability to work on multiple documents

## Technologies Used

- Frontend:
  - React
  - React Quill
  - Socket.IO Client
  - TypeScript
- Backend:
  - Express
  - Socket.IO
  - MongoDB with Mongoose
  - TypeScript

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0.0 or later)

## Setup and Installation

1. Clone the repository:

git clone [https://github.com/hbapte/collaborative-rich-text-editor.git](https://github.com/your-username/collaborative-rich-text-editor.git)
cd collaborative-rich-text-editor

```plaintext

2. Install backend dependencies:
```

npm install

```plaintext

3. Install frontend dependencies:
```

cd client
npm install

```plaintext

4. Create a `.env` file in the root directory and add your MongoDB URI:
```

MONGO_URI=your_mongodb_uri_here

```plaintext

5. Build the TypeScript files:
```

npm run build

```plaintext

## Running the Application

1. Start the backend server:
```

npm start

```plaintext

2. In a new terminal, start the frontend development server:
```

cd client
npm start


3. Open your browser and navigate to `http://localhost:3000` to use the application.

## Usage

1. When you open the application, you'll be assigned a unique user ID.
2. Enter a document ID in the input field to create or join a document.
3. Start typing in the rich text editor. Your changes will be synced in real-time with other users editing the same document.
4. You can see other users' cursors as they move through the document.
5. Use the formatting toolbar to style your text.



## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Create a pull request


## License

This project is licensed under the MIT License

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed correctly.
2. Check that MongoDB is running and accessible.
3. Verify that the correct ports are open and not in use by other applications.
4. Check the console for any error messages.


## Future Enhancements

- User authentication and authorization
- More advanced formatting options
- Version history and document rollback functionality
- Real-time chat alongside document editing


## Contact

If you have any questions or feedback, please open an issue on GitHub.
