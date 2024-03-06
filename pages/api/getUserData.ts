// ../../app/backend/services/session
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import withSession from "@/app/backend/services/session";

const prisma = new PrismaClient()

async function getUserData(req:NextApiRequest, res:NextApiResponse) {
  const userId = req.session.get("userId");
  
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Check if it's a request for user data or just user ID
    const userDataOnly = req.query.userIdOnly === 'true';

    if (userDataOnly) {
      // Return only the user ID
      res.status(200).json({ id: userId });
    } else {
      // Retrieve user data
      const userData = await prisma.appUser.findUnique({
        where: { id: Number(userId) },
        select: { firstName: true }, 
      });
      res.status(200).json(userData);
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
}

export default withSession(getUserData);
