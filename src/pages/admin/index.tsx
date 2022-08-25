import type { GetServerSideProps } from 'next';
import { getCookie } from '@services/cookies';

import { Main } from '@components/Main';
import { Form } from '@components/Main/Pages/Admin/Form';

import { TitleCSS } from '@stylesComponents/Texts';

const Admin = () => {
  return (
    <Main>
      <section className="admin">
        <div className="mx-w">
          <TitleCSS line uppercase style={{ marginBottom: '3.5rem' }}>
            Entrar na Dashboard
          </TitleCSS>
          <div>
            <Form />
          </div>
        </div>
      </section>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (getCookie(ctx, process.env.NEXT_PUBLIC_ADMIN_COOKIE!)) {
    return {
      redirect: {
        destination: '/admin/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Admin;
