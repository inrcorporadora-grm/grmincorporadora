import type { iPage } from 'types/iPage';
import type { iProject } from 'types/iProject';
import { str } from '@services/database/storage';

export function getImages<T extends iPage | iProject>(
  path: string,
  initialValue: T,
  callback?: () => void,
) {
  const newValue = initialValue;

  Object.entries(newValue).forEach(([key, value]) => {
    const keyValue: keyof typeof newValue = key as never;
    const isImage = JSON.stringify(value).includes('"is":"image"');
    if (isImage) {
      if (Array.isArray(value)) {
        str.in(`${path}/${key}`).get((data) => {
          const dataId = data.path.replace(`${path}/${key}/`, '');

          for (let i = 0; i < value.length; i++) {
            const image = value[i];
            if (image.id === dataId) image.url = data.url;
          }
          return callback && callback();
        });
      } else {
        const newImage = value;
        str.in(`${path}`).get((data) => {
          newImage.url = data.url;
          return callback && callback();
        });

        newValue[keyValue] = newImage as never;
      }
    }
  });

  return (newValue as iPage).slides
    ? (newValue as iPage).slides
    : (newValue as T);
}
