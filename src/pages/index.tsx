import type { iProject } from 'types/iProject';
import type { iPage } from 'types/iPage';
import { fetcherSWR } from '@services/fetchers';

import { Main } from '@components/Main';
import { InProgress } from '@components/Main/Sections/InProgress';
import { Deliveries } from '@components/Main/Sections/Deliveries';

const Home = () => {
  const { data: projects, isValidating: projectsLoading } =
    fetcherSWR.useGet<iProject[]>('/api/projects');
  const { data: pageProps, isValidating: pagePropsLoading } =
    fetcherSWR.useGet<iPage>('/api/pages/home');

  return (
    <Main
      slides={pageProps?.slides}
      projects={projects}
      isLoading={pagePropsLoading || projectsLoading}
    >
      {projects && (
        <>
          <InProgress
            projects={projects.filter((project) => project.status === 'new')}
          />
          <Deliveries
            projects={projects.filter(
              (project, i) => project.status === 'delivered' && i < 3, // only three projects
            )}
          />
        </>
      )}
    </Main>
  );
};

export default Home;
