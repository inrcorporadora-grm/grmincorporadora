import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@services/database';
import { iPage } from 'types/iPage';
import { getImages } from '@utils/getImages';
import { urlToDataUrl } from '@utils/urlToDataUrl';

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
      const data = (await db.in('pages').get(page)) as iPage;
      if (!data) return res.status(404).end();
      if (!Array.isArray(data.slides)) {
        const image = await getImages(`pages/${page}`);
        await urlToDataUrl(image[0].url).then((dataUrl) => {
          data.slides = { ...data.slides, url: dataUrl };
        });
        if (image[1]) {
          await urlToDataUrl(image[1].url).then((dataUrl) => {
            data.slides = { ...data.slides, urlMobile: dataUrl };
          });
        }
      }

      return res.status(200).json(data);
    }

    return res.status(404).json({ message: 'Not found' });
  } catch (e) {
    return res.status(400).end();
  }
}
