import { iUser } from 'types/iUser';

export interface iAuthContext {
  authenticateUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  user: iUser | null;
}
