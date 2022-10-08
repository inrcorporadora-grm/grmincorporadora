import type { iProject } from 'types/iProject';

export const makeRows = (projects: iProject[]) =>
  projects.map((project) => {
    return {
      ...project,
      tableName: project.name.name,
    };
  });
