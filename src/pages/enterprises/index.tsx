import type { iProject } from 'types/iProject';
import type { iPage } from 'types/iPage';

import { fetcherSWR } from '@services/fetchers';

import { Main } from '@components/Main';
import { Cards } from '@components/Main/Sections/Cards';

import { AnotherEnterprises } from '@components/Main/Sections/AnotherEnterprises';

const Enterprises = () => {
  const { data: projects, isValidating: projectsLoading } =
    fetcherSWR.useGet<iProject[]>('/api/projects');
  const { data: pageProps, isValidating: pagePropsLoading } =
    fetcherSWR.useGet<iPage>('/api/pages/enterprises');

  return (
    <Main
      slides={pageProps?.slides}
      projects={projects}
      isLoading={pagePropsLoading || projectsLoading}
    >
      {projects && (
        <>
          <Cards projects={projects} />
          <AnotherEnterprises projects={projects} />
        </>
      )}
    </Main>
  );
};

export default Enterprises;
