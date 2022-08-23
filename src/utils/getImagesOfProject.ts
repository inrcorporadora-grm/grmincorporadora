import { str } from '@services/database/storage';

export const getImagesOfProject = (projectId: string) => {
  str.in(`projects/${projectId}`).get();

  return {};
};
