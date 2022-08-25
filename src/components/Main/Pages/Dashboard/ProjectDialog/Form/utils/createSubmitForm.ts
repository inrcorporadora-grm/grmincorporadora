import type { iImage } from 'types/iImage';
import type { iTableProject } from 'types/iProject';
import { getValue } from '@utils/getValue';

interface CreateSubmitForm {
  address: string;
  dataSheets: iTableProject['dataSheets'];
  description: string;
  dimensions: string;
  infos: iTableProject['infos'];
  localeType: string;
  name: string;
  city: string;
  state: string;
  projectStatus: string;
  contrastImage: iImage;
  gallery: iTableProject['gallery'];
  plans: iTableProject['plans'];
  illustrative: iTableProject['illustrative'];
}

export function createSubmitForm(
  {
    address,
    dataSheets,
    description,
    dimensions,
    infos,
    localeType,
    name,
    city,
    state,
    projectStatus,
    gallery,
    plans,
    contrastImage,
    illustrative,
  }: CreateSubmitForm,
  project: iTableProject | undefined,
  type: 'edit' | 'add',
) {
  const projectSubmit = {
    address: getValue(address),
    dataSheets,
    description,
    dimensions,
    infos,
    is: 'project',
    locale: `${city}/${state.substring(0, 2)}`,
    name: {
      localeType: getValue(localeType),
      name,
    },
    status: projectStatus,
    image: {
      is: 'image',
      alt: contrastImage.alt,
      id: contrastImage.id,
    },
    gallery: gallery?.map((img) => ({
      is: 'image',
      alt: img.alt,
      id: img.id,
    })),
    plans: plans?.map((img) => ({
      is: 'image',
      alt: img.alt,
      id: img.id,
    })),
    illustrative: illustrative?.map((img) => ({
      is: 'image',
      alt: img.alt,
      id: img.id,
    })),
  };

  const imagesSubmit = {
    image: {
      path: (id: string) => `projects/${id}/${contrastImage.id}`,
      img: contrastImage.url,
    },
    gallery: gallery?.map((img) => ({
      path: (id: string) => `projects/${id}/gallery/${img.id}`,
      img: img.url,
    })),
    plans: plans?.map((img) => ({
      path: (id: string) => `projects/${id}/plans/${img.id}`,
      img: img.url,
    })),
    illustrative: illustrative?.map((img) => ({
      path: (id: string) => `projects/${id}/illustrative/${img.id}`,
      img: img.url,
    })),
  };

  if (type === 'add') {
    return { projectSubmit, imagesSubmit };
  }

  return {
    projectSubmit: {
      ...projectSubmit,
      id: project?.id,
    },
    imagesSubmit,
  };
}
