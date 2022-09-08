import type { iProject } from 'types/iProject';
import type { iPage } from 'types/iPage';

import { fetcherSWR } from '@services/fetchers';
import { useGetProjectImage } from '@hooks/useGetProjectImage';

import { Main } from '@components/Main';
import { Cards } from '@components/Main/Sections/Cards';

import { AnotherEnterprises } from '@components/Main/Sections/AnotherEnterprises';

const Enterprises = () => {
  const { data: projectsDb } = fetcherSWR.useGet<iProject[]>('/api/projects');
  const { data: pageProps, isValidating: pagePropsLoading } =
    fetcherSWR.useGet<iPage>('/api/pages/enterprises');

  const [projects, projectsLoading] = useGetProjectImage(projectsDb);

  return (
    <Main
      slides={pageProps?.slides}
      projects={projects}
      isLoading={pagePropsLoading || projectsLoading}
    >
      {projects && !projectsLoading && (
        <>
          <Cards projects={projects} />
          <AnotherEnterprises projects={projects} />
        </>
      )}
    </Main>
  );
};

export default Enterprises;
