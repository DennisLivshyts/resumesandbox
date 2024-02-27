import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name } = req.body;

      // Create a new skill in the database
      const newSkill = await prisma.skill.create({
        data: {
          name,
        },
      });

      res.status(200).json(newSkill);
    } catch (error) {
      console.error('Error adding skill data:', error);
      res.status(500).json({ error: 'Failed to add skill data' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
