import type { StaticImageData } from 'next/image';

export interface iImage {
  id: string;
  is: 'image' | 'image';
  url?: string | StaticImageData;
  urlMobile?: string | StaticImageData;
  alt: string;
  slideText?: string;
}
