import type { iPage } from 'types/iPage';
import { fetcherSWR } from '@services/fetchers';

import { Main } from '@components/Main';
import { Form } from '@components/Main/Pages/Land/Form';

import { TitleCSS } from '@stylesComponents/Texts';

const Land = () => {
  const { data: pageProps, isValidating: pagePropsLoading } =
    fetcherSWR.useGet<iPage>('/api/pages/enterprises');

  return (
    <Main slides={pageProps?.slides} isLoading={pagePropsLoading}>
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
