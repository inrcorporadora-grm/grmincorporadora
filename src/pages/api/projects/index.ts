import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@services/database';
import { iProject } from 'types/iProject';
import { getProjectImages } from '@utils/getProjectImages';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const data = (await db.in('projects').get(undefined)) as iProject[];
      const projects =
        data &&
        (await Promise.all(
          data.map(async (project) => {
            const newProject = await getProjectImages(project);
            return newProject;
          }),
        ));
      return res.status(200).json(projects);
    }
    if (req.method === 'POST') {
      const projectSubmit = req.body;
      const data = (await db.in('projects').add(projectSubmit)) as iProject[];
      const projects =
        data &&
        (await Promise.all(
          data.map(async (project) => {
            const newProject = await getProjectImages(project);
            return newProject;
          }),
        ));
      return res.status(200).json(projects);
    }

    return res.status(404).json({ message: 'Not found' });
  } catch (e) {
    return res.status(400).end();
  }
}
