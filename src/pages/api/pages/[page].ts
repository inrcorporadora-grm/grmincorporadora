import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@services/database';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const page = req.query.page as string;

  try {
    if (req.method === 'PUT') {
      const toSubmit = req.body;
      const data = await db.in('pages').put(page, toSubmit);
      return res.status(200).json(data);
    }
    if (req.method === 'GET') {
      const data = await db.in('pages').get(page);
      if (!data) return res.status(404).end();
      return res.status(200).json(data);
    }

    return res.status(404).json({ message: 'Not found' });
  } catch (e) {
    return res.status(400).end();
  }
}
