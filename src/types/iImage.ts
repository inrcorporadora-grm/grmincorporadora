import type { StaticImageData } from 'next/image';

export interface iImage {
  id: string;
  is: 'image';
  url?: string | StaticImageData;
  alt: string;
}
