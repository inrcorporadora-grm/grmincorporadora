import type { iPage } from 'types/iPage';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { useGetSlides } from '@hooks/useGetSlides';
import { fetcher } from '@services/fetchers';

import { Main } from '@components/Main';
import { Form } from '@components/Main/Pages/Contact/Form';

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
    .get('/api/pages/contact')
    .then((data: iPage) => data)
    .catch(() => null);

  return {
    props: {
      pageProps,
    },
  };
};

const Contact = ({
  pageProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [slides, , loadingSlides] = useGetSlides(
    pageProps || undefined,
    'contact',
  );

  return (
    <Main slides={slides} isLoading={loadingSlides}>
      <section className="contact">
        <div className="mx-w">
          <TitleCSS line uppercase style={{ marginBottom: '3.5rem' }}>
            Contato
          </TitleCSS>
          <div>
            <Form />
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Contact;
