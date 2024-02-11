import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../app/backend/services/authService';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await prisma.appUser.findUnique({ where: { email } });

      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash the password using the shared function
      const hashedPassword = await hashPassword(password);

      // Generate a unique userId
      const userId = Math.floor(Math.random() * 1000000); // You can use any method to generate a unique userId
      
      // Create the user in the database with the generated userId
      await prisma.appUser.create({
        data: {
          id: userId,
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });

      console.log('User created successfully');
  
      res.status(201).json({ message: 'User created successfully', userId }); // Return the generated userId in the response
    } catch (error:any) {
      console.error('Error signing up:', error.message);
      res.status(500).json({ error: 'Failed to sign up' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
