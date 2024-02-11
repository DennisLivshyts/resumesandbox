import { withIronSession } from 'next-iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

export default function withSession(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return withIronSession(handler, {
    password: process.env.SESSION_SECRET || '', // Ensure a default value is provided if process.env.SESSION_SECRET is undefined
    cookieName: 'session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
