import type { GetStaticPaths, GetStaticProps } from 'next';
import type { iProject } from 'types/iProject';

import { useState, useEffect } from 'react';
import { fetcher, fetcherSWR } from '@services/fetchers';
import { useGetProject } from '@hooks/useGetProject';

import { Main } from '@components/Main';
import { AnotherEnterprises } from '@components/Main/Sections/AnotherEnterprises';
import { Navigation } from '@components/Main/Sections/Cards/Navigation';
import { DataSheets } from '@components/Main/Pages/Project/DataSheets';
import { Gallery } from '@components/Main/Pages/Project/Gallery';

import { ParagraphCSS, SubTitleCSS, TitleCSS } from '@stylesComponents/Texts';

interface ProjectProps {
  projectId: string;
}

const Project = ({ projectId }: ProjectProps) => {
  const { data: projectsDb, isValidating } =
    fetcherSWR.useGet<iProject[]>('/api/projects');

  const [projects, , loadingProject] = useGetProject(projectsDb || undefined);

  const [project, setProject] = useState<iProject | undefined>(undefined);
  const [page, setPage] = useState('in-progress');

  useEffect(() => {
    setProject(projects?.filter(({ id }) => id === projectId)[0]);
  }, [projects, projectId]);
  useEffect(() => {
    setPage(project?.status === 'new' ? 'in-progress' : 'deliveries');
  }, [project]);

  return (
    <Main
      projects={projects}
      slides={project?.image}
      isLoading={isValidating || loadingProject}
      blockEdit
    >
      <section className="project">
        <Navigation page={page} setPage={setPage} />

        {project && (
          <div className="mx-w">
            <section>
              <ParagraphCSS uppercase bold>
                {project.status === 'new' ? 'Em andamento' : 'Entregue'}
              </ParagraphCSS>
              <TitleCSS line>{project.name.name}</TitleCSS>
            </section>
            <section>
              <SubTitleCSS style={{ marginBottom: 0 }}>Descrição</SubTitleCSS>
              <ParagraphCSS>{project.description}</ParagraphCSS>
            </section>
            <DataSheets
              dataSheets={project.dataSheets}
              name={project.name.name}
              dimensions={project.dimensions}
              locale={`${project.address ? `${project.address} - ` : ''}${
                project.locale
              }`}
            />
            {project.gallery && project.gallery.length > 0 && (
              <Gallery title="Galeria de fotos" images={project.gallery} />
            )}
            {project.plans && project.plans.length > 0 && (
              <Gallery title="Plantas" images={project.plans} />
            )}
            {project.illustrative && project.illustrative.length > 0 && (
              <Gallery title="Ilustrações" images={project.illustrative} />
            )}
          </div>
        )}
      </section>

      {projects && <AnotherEnterprises projects={projects} />}
    </Main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projectsIds: string[] | null = await fetcher
    .get('/api/projects/ids')
    .then((r) => r)
    .catch(() => null);

  const paths =
    projectsIds?.map((id) => ({
      params: { id },
    })) || [];

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const projectId = params?.id;

  return {
    props: {
      projectId: projectId || null,
    },
    revalidate: 60 * 5, // 5 minutes
  };
};
export default Project;
