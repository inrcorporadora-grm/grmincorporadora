import type { iPage } from 'types/iPage';
import { fetcherSWR } from '@services/fetchers';

import { Main } from '@components/Main';
import { InProgress } from '@components/Main/Sections/InProgress';
import { Deliveries } from '@components/Main/Sections/Deliveries';
import { useLayoutContext } from '@contexts/Layout/useLayoutContext';

const Home = () => {
  const { projects } = useLayoutContext();
  const { data: pageProps, isValidating: pagePropsLoading } =
    fetcherSWR.useGet<iPage>('/api/pages/home');

  return (
    <Main
      slides={pageProps?.slides}
      projects={projects.projects}
      isLoading={pagePropsLoading || projects.loading}
    >
      {projects.projects && (
        <>
          <InProgress
            projects={projects.projects.filter(
              (project) => project.status === 'new',
            )}
          />
          <Deliveries
            projects={projects.projects.filter(
              (project, i) => project.status === 'delivered' && i < 3, // only three projects
            )}
          />
        </>
      )}
    </Main>
  );
};

export default Home;
