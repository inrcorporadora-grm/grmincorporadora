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
import { InProgress } from '@components/Main/Sections/InProgress';
import { Deliveries } from '@components/Main/Sections/Deliveries';

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
    .get('/api/pages/home')
    .then((data: iPage) => data)
    .catch(() => null);

  return {
    props: {
      pageProps,
    },
  };
};

const Home = ({
  pageProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: projectsDb, isValidating } =
    fetcherSWR.useGet<iProject[]>('/api/projects');

  const [projects, , loadingProject] = useGetProject(projectsDb || undefined);
  const [slides, , loadingSlides] = useGetSlides(
    pageProps || undefined,
    'home',
  );

  return (
    <Main
      isLoading={loadingProject || loadingSlides || isValidating}
      slides={slides}
      projects={projects}
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
