import { Session } from 'next-iron-session';

declare module 'next' {
  interface NextApiRequest {
    session: Session;
  }
}
