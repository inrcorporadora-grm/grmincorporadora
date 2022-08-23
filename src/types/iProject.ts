import type { iImage } from './iImage';

export interface iProjectForm {
  id: string;
  is: 'project';
  status: 'new' | 'delivered';
  locale: string;
  address: string;
  dimensions: string;
  description: string;

  name: {
    localeType?: string;
    name: string;
  };
  dataSheets: {
    id: string;
    sheet: string;
    data: string;
  }[];
  image: iImage;
  infos: {
    id: string;
    text: string;
    abbr?: string;
  }[];
}

export interface iProjectImages {
  gallery?: iImage[];
  illustrative?: iImage[];
  plans?: iImage[];
}

export interface iProject extends iProjectImages, iProjectForm {}

export interface iTableProject extends iProject {
  tableName: string;
}
