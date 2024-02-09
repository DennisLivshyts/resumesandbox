import { PrismaClient } from '@prisma/client';
import { verifyPassword } from '../../app/backend/services/authService';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await prisma.appUser.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Verify password
      const passwordMatch = await verifyPassword(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Ensure process.env.JWT_SECRET is defined
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret is not defined in environment variables');
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
