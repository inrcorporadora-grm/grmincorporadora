import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@services/database';
import { iProject } from 'types/iProject';
import { str } from '@services/database/storage';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id as string;

  try {
    if (req.method === 'PUT') {
      const projectSubmit = req.body;
      const data = await db.in('projects').put(id, projectSubmit);
      return res.status(200).json(data);
    }
    if (req.method === 'DELETE') {
      await db.in('projects').del(id);
      await str.in(`projects/${id}`).del(true);
      await str.in(`projects/${id}/plans`).del(true);
      await str.in(`projects/${id}/gallery`).del(true);
      await str.in(`projects/${id}/illustrative`).del(true);
      return res.status(200).json({ message: 'Project deleted.' });
    }
    if (req.method === 'GET') {
      const data = (await db.in('projects').get(id)) as iProject;
      return res.status(200).json(data);
    }

    return res.status(404).json({ message: 'Not found' });
  } catch (e) {
    return res.status(400).send(e);
  }
}
