import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId, school, degree, skills, experiences } = req.body;

      // Create an array of skill objects
      const skillObjects = skills.map((skillName: string) => ({
        name: skillName,
      }));

      // Find the AppUser based on the userId
      const user = await prisma.appUser.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create the resume and associate skills with it
      const newResume = await prisma.resume.create({
        data: {
          appUser: { connect: { id: userId } },
          school,
          degree,
          skills: { create: skillObjects },
          experiences: { createMany: { data: experiences } },
        },
        include: { skills: true }, // Include the created skills in the response
      });

      res.status(200).json(newResume);
    } catch (error) {
      console.error('Error adding resume data:', error);
      res.status(500).json({ error: 'Failed to add resume data' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
