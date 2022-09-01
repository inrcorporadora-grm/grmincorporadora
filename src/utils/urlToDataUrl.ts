import { fetcher } from '@services/fetchers';

export async function urlToDataUrl(url: string) {
  const image = await fetcher.get(url, {
    responseType: 'arraybuffer',
  });
  const returnedB64 = Buffer.from(image as any).toString('base64');
  return `data:image/png;base64,${returnedB64}`;
}
