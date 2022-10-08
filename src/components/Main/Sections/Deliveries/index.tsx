import type { iProject } from 'types/iProject';
import { useState } from 'react';
import { Button } from '@components/Buttons/Button';

import { TitleCSS } from '@stylesComponents/Texts';

import { useLayoutContext } from '@contexts/Layout/useLayoutContext';
import { ContainerCSS } from './styles';
import { CardDelivered } from './Card';
import { Edit } from './Edit';

export interface DeliveriesProps {
  projects: iProject[];
  projectsIds: string[];
}

export const Deliveries = ({
  projects,
  projectsIds: projectsIdsProps,
}: DeliveriesProps) => {
  const [projectsIds, setProjectsIds] = useState(projectsIdsProps);
  const { isUserAdmin } = useLayoutContext();

  return (
    <ContainerCSS>
      <div className="mx-w">
        <TitleCSS line uppercase style={{ marginBottom: '4rem' }}>
          Empreendimentos <br />
          <span style={{ fontWeight: '700' }}>entregues</span>
        </TitleCSS>
      </div>
      <div>
        <div className="projects">
          {projectsIds &&
            projects
              .filter((project) => projectsIds.includes(project.id))
              .map((projectDelivered) => (
                <CardDelivered
                  key={projectDelivered.id}
                  project={projectDelivered}
                />
              ))}
        </div>
        <Button
          styles={{ margin: '3rem 0', alignSelf: 'center' }}
          href="/enterprises?page=deliveries"
        >
          Veja mais
        </Button>
      </div>
      {isUserAdmin && (
        <Edit
          projectsIds={projectsIds}
          projects={projects}
          setProjectsIds={setProjectsIds}
        />
      )}
    </ContainerCSS>
  );
};
