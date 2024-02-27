import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password, firstName, lastName } = req.body;

      const newUser = await prisma.appUser.create({
        data: {
          email,
          password,
          firstName,
          lastName,
        },
      });

      res.status(200).json(newUser);
    } catch (error) {
      console.error('Error adding user data:', error);
      res.status(500).json({ error: 'Failed to add user data' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
