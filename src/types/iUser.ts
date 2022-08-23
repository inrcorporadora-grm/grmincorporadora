import { User } from 'firebase/auth';

export interface iUser {
  email: string;
  uid: string;
}

export interface iUserFirebase extends User {}
