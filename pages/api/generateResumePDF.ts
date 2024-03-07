import { PrismaClient } from '@prisma/client';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, template } = req.query;

  try {
    // Retrieve the user's resume data from the database
    const resumeData = await prisma.resume.findUnique({
      where: { id: parseInt(userId as string, 10) },
      include: {
        skills: true,
        experiences: true,
      },
    });

    // Load the selected template HTML file
    const templatePath = path.join(process.cwd(), 'templates', `${template}.html`);
    const templateHtml = fs.readFileSync(templatePath, 'utf-8');

    // Create a new browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the content of the page to the selected template HTML
    await page.setContent(templateHtml);

    // Populate the template with the retrieved resume data
    await page.evaluate((resumeData) => {
      // Use JavaScript to populate the template with resume data
      document.getElementById('name').textContent = `${resumeData.appUser.firstName} ${resumeData.appUser.lastName}`;
      // Populate other resume fields similarly
    }, resumeData);

    // Generate the PDF
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Close the browser instance
    await browser.close();

    // Set the response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');

    // Send the PDF file as the response
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}