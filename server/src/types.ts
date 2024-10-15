// types.ts
import { Request } from 'express';
import { Socket } from 'socket.io';
import { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadWithUserId extends JwtPayload {
  userId: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayloadWithUserId;
}

export interface AuthenticatedSocket extends Socket {
  user?: JwtPayloadWithUserId;
}
