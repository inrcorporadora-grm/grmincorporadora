import * as admin from 'firebase-admin';
import adminsdk from './adminsdk.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: adminsdk.client_email,
      privateKey: adminsdk.private_key,
    }),
  });
}

export const database = admin.firestore();
