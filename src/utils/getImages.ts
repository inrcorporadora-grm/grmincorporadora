import { str } from '@services/database/storage';

export async function getImages(path: string) {
  const images = await str.in(path).get();
  const newImagePromise = await Promise.all(
    images.map(async (image) => {
      const newImage = {
        path: '',
        url: '',
      };
      await str.download(image.img).then((img) => {
        newImage.path = image.path;
        newImage.url = img;
      });
      return newImage;
    }),
  );

  return newImagePromise;
}
