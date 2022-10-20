import type { iImage } from 'types/iImage';
import type { iTableProject } from 'types/iProject';
import { getRealValue } from '@utils/getRealValue';

interface CreateSubmitForm {
  address: string;
  dataSheets: iTableProject['dataSheets'];
  description: string;
  dimensions: string;
  infos: iTableProject['infos'];
  video: string | undefined;
  localeType: string;
  name: string;
  city: string;
  state: string;
  website: string;
  projectStatus: string;
  contrastImage: {
    image: iImage;
    imageMobile: iImage | null;
  };
  gallery: iTableProject['gallery'];
  plans: iTableProject['plans'];
  illustrative: iTableProject['illustrative'];
}

function ytParser(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
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
    video,
    city,
    state,
    projectStatus,
    gallery,
    plans,
    website,
    contrastImage,
    illustrative,
  }: CreateSubmitForm,
  project: iTableProject | undefined,
  type: 'edit' | 'add',
) {
  const urlVideo = getRealValue(video);

  const projectSubmit = {
    address: getRealValue(address)?.trim(),
    dataSheets,
    description: description.trim(),
    dimensions: dimensions.trim(),
    infos,
    website: getRealValue(website)?.trim(),
    video: urlVideo ? ytParser(urlVideo) : undefined,
    is: 'project',
    locale: `${city.trim()}/${state.substring(0, 2)}`,
    name: {
      localeType: getRealValue(localeType)?.trim(),
      name: name.trim(),
    },
    status: projectStatus,
    image: {
      is: 'image',
      alt: contrastImage.image.alt,
      id: contrastImage.image.id,
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
      path: (id: string) => `projects/${id}/${contrastImage.image.id}`,
      img: contrastImage.image.url,
      imgMobile: getRealValue(contrastImage.imageMobile?.url as string),
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
