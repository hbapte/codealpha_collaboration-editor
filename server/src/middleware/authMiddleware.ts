// // authMiddleware.ts
// import { Request, Response, NextFunction } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { AuthenticatedRequest, AuthenticatedSocket, JwtPayloadWithUserId } from '../types';

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// // Middleware to authenticate HTTP requests
// export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) {
//     return res.sendStatus(401); // Unauthorized
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403); // Forbidden
//     }
//     req.user = user as JwtPayloadWithUserId;
//     next();
//   });
// };

// // Middleware to authenticate WebSocket connections
// export const authenticateSocket = (socket: AuthenticatedSocket, next: (err?: Error) => void) => {
//   const token = socket.handshake.auth.token;

//   if (!token) {
//     return next(new Error('Authentication error'));
//   }

//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) return next(new Error('Authentication error'));
    
//     socket.user = decoded as JwtPayloadWithUserId;
//     next();
//   });
// };
