import type { iProject } from 'types/iProject';
import type { GetServerSideProps } from 'next';

import { useState } from 'react';
import { cookie } from '@services/cookies';
import { fetcherSWR } from '@services/fetchers';
import { useAuthContext } from '@contexts/Auth/useAuthContext';
import { useGetProject } from '@hooks/useGetProject';

import { Main } from '@components/Main';
import { Button } from '@components/Buttons/Button';
import { ProjectTable } from '@components/Main/Pages/Dashboard/ProjectTable';
import { ProjectDialog } from '@components/Main/Pages/Dashboard/ProjectDialog';
import { ParagraphCSS } from '@stylesComponents/Texts';

const Dashboard = () => {
  const { user } = useAuthContext();

  const { data: projectsDb, isValidating } =
    fetcherSWR.useGet<iProject[]>('/api/projects');

  const [projects, setProjects, loadingProject] = useGetProject(
    projectsDb || undefined,
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Main isLoading={isValidating || loadingProject}>
      <section className="dashboard">
        <div>
          <ParagraphCSS>você está logado como: {user?.email}</ParagraphCSS>
          <Button onClick={() => setIsDialogOpen(true)}>
            Adicionar Projeto +
          </Button>
          <ProjectTable projects={projects} />
          <ProjectDialog
            setProjects={setProjects}
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
