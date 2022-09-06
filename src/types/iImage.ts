import type { StaticImageData } from 'next/image';

export interface iImage {
  id: string;
  is: 'image' | 'image-mock';
  url?: string | StaticImageData;
  alt: string;
  slideText?: string;
}
