import { iImage } from './iImage';

export interface iPage {
  slides: iImage | string[];
  others: {
    deliveredProjects: string[];
  };
}
