import type { GetServerSideProps } from 'next';

import { useState } from 'react';
import { cookie } from '@services/cookies';
import { useAuthContext } from '@contexts/Auth/useAuthContext';

import { Main } from '@components/Main';
import { Button } from '@components/Buttons/Button';
import { ProjectTable } from '@components/Main/Pages/Dashboard/ProjectTable';
import { ProjectDialog } from '@components/Main/Pages/Dashboard/ProjectDialog';
import { ParagraphCSS } from '@stylesComponents/Texts';
import { useLayoutContext } from '@contexts/Layout/useLayoutContext';

const Dashboard = () => {
  const { projects } = useLayoutContext();
  const { user } = useAuthContext();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Main isLoading={projects.loading}>
      <section className="dashboard">
        <div>
          <ParagraphCSS>você está logado como: {user?.email}</ParagraphCSS>
          <Button onClick={() => setIsDialogOpen(true)}>
            Adicionar Projeto +
          </Button>
          <ProjectTable projects={projects.projects} />
          <ProjectDialog
            setProjects={projects.set}
            open={isDialogOpen}
            setOpen={setIsDialogOpen}
            title="Adicionar Projeto"
          />
        </div>
      </section>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userToken = cookie.get(ctx, process.env.NEXT_PUBLIC_ADMIN_COOKIE!);

  if (!userToken) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Dashboard;
