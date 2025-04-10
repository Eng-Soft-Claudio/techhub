import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  avatarUrl?: string;
}

// Usuário hardcoded para teste
const mockUser: User = {
  id: '1',
  name: 'Admin',
  email: 'admin@techhub.com',
  password: '12345',
  role: 'admin',
  avatarUrl: 'https://via.placeholder.com/150',
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email !== mockUser.email || password !== mockUser.password) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign(
    { id: mockUser.id, role: mockUser.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );

  const { password: _, ...userWithoutPassword } = mockUser;

  return res.json({
    user: userWithoutPassword,
    token,
  });
};
