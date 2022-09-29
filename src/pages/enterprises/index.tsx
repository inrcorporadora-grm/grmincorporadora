import type { iPage } from 'types/iPage';

import { fetcherSWR } from '@services/fetchers';

import { Main } from '@components/Main';
import { Cards } from '@components/Main/Sections/Cards';

import { AnotherEnterprises } from '@components/Main/Sections/AnotherEnterprises';
import { useLayoutContext } from '@contexts/Layout/useLayoutContext';

const Enterprises = () => {
  const { projects } = useLayoutContext();
  const { data: pageProps, isValidating: pagePropsLoading } =
    fetcherSWR.useGet<iPage>('/api/pages/enterprises');

  return (
    <Main
      slides={pageProps?.slides}
      projects={projects.projects}
      isLoading={pagePropsLoading || projects.loading}
    >
      {projects.projects && !projects.loading && (
        <>
          <Cards projects={projects.projects} />
          <AnotherEnterprises projects={projects.projects} />
        </>
      )}
    </Main>
  );
};

export default Enterprises;
