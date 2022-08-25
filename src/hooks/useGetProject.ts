import type { iProject } from 'types/iProject';
import { getImages } from '@utils/getImages';
import { useEffect, useState } from 'react';

export const useGetProject = (
  projectsDb: iProject[] | undefined,
): [
  iProject[] | undefined,
  React.Dispatch<React.SetStateAction<iProject[] | undefined>>,
  boolean,
] => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState(projectsDb);

  useEffect(() => {
    if (projectsDb && projectsDb.length) {
      setLoading(true);
      setProjects(
        projectsDb.map((project) => {
          const newProject = getImages(`projects/${project.id}`, project, () =>
            setLoading(false),
          );

          return newProject as iProject;
        }),
      );
    }
  }, [projectsDb]);

  return [projects, setProjects, loading];
};
