import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId, school, degree, skills, experiences, summary } = req.body;

      // Create an array of skill objects
      const skillObjects = skills.map((skillName: string) => ({
        name: skillName,
      }));

      // Create the resume and associate skills and experiences with it
      const newResume = await prisma.resume.create({
        data: {
          appUser: { connect: { id: userId } },
          school,
          degree,
           // Include summary if available
          skills: { create: skillObjects }, // Create skills if they don't exist
          experiences: {
            createMany: {
              data: experiences.map((exp: any) => ({
                title: exp.title,
                company: exp.company,
                position: exp.position,
                start: new Date(exp.start),
                end: exp.end ? new Date(exp.end) : undefined,
                description: exp.description,
              })),
            },
          },
        },
        include: { skills: true, experiences: true }, // Include the created skills and experiences in the response
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
