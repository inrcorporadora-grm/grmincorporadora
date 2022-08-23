import type { iImage } from 'types/iImage';
import { generateId } from './generateId';

import ImageMock from '../assets/img/image-mock.jpg';

export const imageMock: iImage = {
  alt: 'Erro ao carregar a imagem',
  id: generateId(),
  url: ImageMock,
  is: 'image',
};
