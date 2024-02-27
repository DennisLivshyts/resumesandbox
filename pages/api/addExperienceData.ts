import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { resumeId, title, company, position, start, end, description } = req.body;

      // Create a new experience in the database
      const newExperience = await prisma.experience.create({
        data: {
          resumeId,
          title,
          company,
          position,
          start: new Date(start),
          end: end ? new Date(end) : undefined,
          description,
        },
      });

      res.status(200).json(newExperience);
    } catch (error) {
      console.error('Error adding experience data:', error);
      res.status(500).json({ error: 'Failed to add experience data' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
