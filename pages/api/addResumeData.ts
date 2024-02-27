import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {userId, skills, education, experiences, summary} = req.body;
      console.log('User ID:', userId);
      const school = education[0].school;
      const degree = education[0].degree;
      const major = education[0].major;
      const gpa = education[0].gpa;
      const startDate = education[0].startDate ? new Date(education[0].startDate).toISOString() : null;
      const endDate = education[0].endDate ? new Date(education[0].endDate).toISOString() : null;
      // Create an array of skill objects
      const userIDtoInt = Number(userId);
      const skillObjects = skills.map((skillName: string) => ({
        name: skillName,
      }));
      const experienceObjects = experiences.map((exp: { title: any; company: any; position: any; startDate: string | number | Date; endDate: string | number | Date; description: any; }) => {
        return {
          title: exp.title,
          company: exp.company,
          position: exp.position,
          start: exp.startDate ? new Date(exp.startDate) : null,
          end: exp.endDate ? new Date(exp.endDate) : null,
          description: exp.description
        }
      });

      // Create the resume and associate skills and experiences with it
      const newResume = await prisma.resume.create({
        data: {
          appUser: { connect: { id: userIDtoInt } },
          school, 
          degree,
          major,
          gpa,
          startDate,
          endDate,
           // Include summary if available
          skills: { create: skillObjects }, // Create skills if they don't exist
          experiences: {
            createMany: {
              data: experienceObjects
            }
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
