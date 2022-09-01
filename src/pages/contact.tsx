import type { iPage } from 'types/iPage';
import { fetcherSWR } from '@services/fetchers';

import { Main } from '@components/Main';
import { Form } from '@components/Main/Pages/Contact/Form';

import { TitleCSS } from '@stylesComponents/Texts';

const Contact = () => {
  const { data: pageProps, isValidating: pagePropsLoading } =
    fetcherSWR.useGet<iPage>('/api/pages/enterprises');

  return (
    <Main slides={pageProps?.slides} isLoading={pagePropsLoading}>
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
