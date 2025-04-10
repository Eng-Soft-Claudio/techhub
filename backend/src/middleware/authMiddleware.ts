/// <reference path="../types/express/index.d.ts" />
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/UserPayload';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'object' && 'id' in decoded && 'email' in decoded) {
      req.user = decoded as UserPayload;
      next();
    } else {
      return res.status(403).json({ message: 'Token inválido' });
    }
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
  
}
