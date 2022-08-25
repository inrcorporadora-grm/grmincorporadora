import type { iPage } from 'types/iPage';
import type { iImage } from 'types/iImage';
import { getImages } from '@utils/getImages';
import { imageMock } from '@utils/imageMock';
import { useEffect, useState } from 'react';

export const useGetSlides = (
  slidesDb: iPage | undefined,
  page: string,
): [
  iPage['slides'] | undefined,
  React.Dispatch<React.SetStateAction<iPage['slides'] | undefined>>,
  boolean,
] => {
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState(slidesDb?.slides);

  useEffect(() => {
    if (slidesDb?.slides && !Array.isArray(slidesDb?.slides)) {
      setLoading(true);
      setSlides(
        slidesDb
          ? (getImages(`pages/${page}`, slidesDb, () =>
              setLoading(false),
            ) as iImage)
          : imageMock,
      );
    }
  }, [slidesDb, page]);

  return [slides, setSlides, loading];
};
