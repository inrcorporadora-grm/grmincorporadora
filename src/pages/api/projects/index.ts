import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@services/database';
import { iProject } from 'types/iProject';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const data = (await db.in('projects').get(undefined)) as iProject[];
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const projectSubmit = req.body;

      const data = (await db.in('projects').add(projectSubmit)) as iProject[];
      return res.status(200).json(data);
    }

    return res.status(404).json({ message: 'Not found' });
  } catch (e) {
    return res.status(400).end();
  }
}
