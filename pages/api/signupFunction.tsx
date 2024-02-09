// signupFunction.js

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

      // Create the user in the database
      await prisma.appUser.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });

      console.log('User created successfully');
      res.status(201).json({ message: 'User created successfully' });
    } catch (error:any) {
      console.error('Error signing up:', error.message);
      res.status(500).json({ error: 'Failed to sign up' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
