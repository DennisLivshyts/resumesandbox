import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const resumes = await prisma.resume.findMany();
      res.status(200).json(resumes);
    } catch (error) {
      console.error('Error fetching resume data:', error);
      res.status(500).json({ error: 'Failed to fetch resume data' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
