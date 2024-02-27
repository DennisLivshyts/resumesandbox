
'../../app/backend/services/session'
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import withSession from "@/app/backend/services/session";

const prisma = new PrismaClient()

async function handler(req:NextApiRequest, res:NextApiResponse) {
  const userId = req.session.get("userId");
  
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userData = await prisma.appUser.findUnique({
      where: { id: Number(userId) },
      select: { firstName: true }, 
    });

    res.status(200).json(userData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
}

export default withSession(handler);