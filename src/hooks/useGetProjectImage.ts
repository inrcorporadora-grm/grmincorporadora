import { getProjectImages } from '@utils/getProjectImages';
import { useEffect, useState } from 'react';
import { iProject } from 'types/iProject';

export const useGetProjectImage = <T extends iProject | iProject[] | undefined>(
  data: T,
): [T, boolean, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  const [projects, setProjects] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      Promise.all(
        data.map(async (project) => {
          const newProject = await getProjectImages(project);
          return newProject;
        }),
      )
        .then((projectsRes) => {
          setProjects(projectsRes as T);
        })
        .finally(() => setIsLoading(false));
    } else if (data) {
      getProjectImages(data)
        .then((projectRes) => {
          setProjects(projectRes as T);
        })
        .finally(() => setIsLoading(false));
    }
  }, [data]);

  return [projects as T, isLoading, setProjects];
};
