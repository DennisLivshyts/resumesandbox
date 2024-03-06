import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId, skills, education, experiences, summary } = req.body;
      console.log('User ID:', userId);

      const userIDtoInt = Number(userId);

      const skillObjects = skills.map((skillName: string) => ({
        name: skillName,
      }));

      const experienceObjects = experiences.map((exp: {
        company: any;
        position: any;
        startDate: string | number | Date;
        endDate: string | number | Date;
        description: any;
      }) => ({
        company: exp.company,
        position: exp.position,
        start: exp.startDate ? new Date(exp.startDate) : new Date(),
        end: exp.endDate ? new Date(exp.endDate) : new Date(),
        description: exp.description,
      }));

      const educationObject = {
        school: education[0].school,
        degree: education[0].degree,
        major: education[0].major,
        gpa: education[0].gpa,
        startDate: education[0].startDate ? new Date(education[0].startDate).toISOString() : null,
        endDate: education[0].endDate ? new Date(education[0].endDate).toISOString() : null,
      };

      const newResume = await prisma.resume.create({
        data: {
          appUser: {
            connect: {
              id: userIDtoInt,
            },
          },
          ...educationObject,
          skills: {
            create: skillObjects,
          },
          experiences: {
            createMany: {
              data: experienceObjects,
            },
          },
        },
        include: {
          skills: true,
          experiences: true,
        },
      });

      res.status(200).json({success:true,data:newResume});
    } catch (error) {
      console.error('Error adding resume data:', error);
      res.status(500).json({ error: 'Failed to add resume data' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}