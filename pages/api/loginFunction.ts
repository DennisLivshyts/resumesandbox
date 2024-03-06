import { PrismaClient } from '@prisma/client';
import { verifyPassword } from '../../app/backend/services/authService';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import withSession from '../../app/backend/services/session';

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
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

      // Store user ID in the session
      req.session.set('userId', user.id);
      await req.session.save();

      // Log user ID value and indicate it was added to session storage
      console.log('User ID:', user.id, 'was successfully added to session storage');

      res.status(200).json({ token, userId:user.id });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

export default withSession(handler);
