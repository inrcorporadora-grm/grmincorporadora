import type { iProject } from 'types/iProject';
import type { iPage } from 'types/iPage';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { fetcher, fetcherSWR } from '@services/fetchers';
import { useGetSlides } from '@hooks/useGetSlides';
import { useGetProject } from '@hooks/useGetProject';

import { Main } from '@components/Main';
import { Cards } from '@components/Main/Sections/Cards';

import { AnotherEnterprises } from '@components/Main/Sections/AnotherEnterprises';

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const maxAge = 60 * 5; // 5 minutes
  const staleWhileRevalidate = 60 * 2; // 2 minutes
  res.setHeader(
    'Cache-Control',
    `public, max-age=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`,
  );

  const pageProps = await fetcher
    .get('/api/pages/enterprises')
    .then((data: iPage) => data)
    .catch(() => null);

  return {
    props: {
      pageProps,
    },
  };
};

const Enterprises = ({
  pageProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: projectsDb, isValidating } =
    fetcherSWR.useGet<iProject[]>('/api/projects');

  const [projects, , loadingProject] = useGetProject(projectsDb || undefined);
  const [slides, , loadingSlides] = useGetSlides(
    pageProps || undefined,
    'enterprises',
  );

  return (
    <Main
      slides={slides}
      projects={projects}
      isLoading={isValidating || loadingProject || loadingSlides}
    >
      {projects && !loadingProject && (
        <>
          <Cards projects={projects} />
          <AnotherEnterprises projects={projects} />
        </>
      )}
    </Main>
  );
};

export default Enterprises;
