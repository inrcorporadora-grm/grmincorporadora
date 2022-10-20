import type { iImage } from 'types/iImage';
import { generateId } from './generateId';

import ImageMock from '../assets/img/image-mock.jpg';

export const imageMock: iImage = {
  alt: 'Carregando...',
  id: generateId(),
  url: ImageMock,
  is: 'image',
  slideText: '',
};
