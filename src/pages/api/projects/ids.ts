import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@services/database';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const data = (await db.in('projects').get(undefined, {
        onlyId: true,
      })) as string[];

      return res.status(200).json(data);
    }

    return res.status(404).json({ message: 'Not found' });
  } catch (e) {
    return res.status(400).end();
  }
}
