import type { iPage } from 'types/iPage';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { fetcher } from '@services/fetchers';
import { useGetSlides } from '@hooks/useGetSlides';

import { Main } from '@components/Main';
import { Form } from '@components/Main/Pages/Land/Form';

import { TitleCSS } from '@stylesComponents/Texts';

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
    .get('/api/pages/land')
    .then((data: iPage) => data)
    .catch(() => null);

  return {
    props: {
      pageProps,
    },
  };
};

const Land = ({
  pageProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [slides, , loadingSlides] = useGetSlides(
    pageProps || undefined,
    'land',
  );

  return (
    <Main slides={slides} isLoading={loadingSlides}>
      <section className="land">
        <div className="mx-w">
          <TitleCSS line uppercase style={{ marginBottom: '3.5rem' }}>
            Ofereça seu terreno
          </TitleCSS>
          <div>
            <Form />
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Land;
