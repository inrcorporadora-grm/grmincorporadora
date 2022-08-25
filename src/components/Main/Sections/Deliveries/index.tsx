import type { iProject } from 'types/iProject';
import { Button } from '@components/Buttons/Button';

import { TitleCSS } from '@stylesComponents/Texts';

import { ContainerCSS } from './styles';
import { CardDelivered } from './Card';

export interface DeliveriesProps {
  projects: iProject[];
}

export const Deliveries = ({ projects }: DeliveriesProps) => {
  return (
    <ContainerCSS>
      <div className="mx-w">
        <TitleCSS line uppercase style={{ marginBottom: '4rem' }}>
          Empreendimentos <br />
          <span style={{ fontWeight: '700' }}>entregues</span>
        </TitleCSS>

        <div className="projects">
          {projects.map((projectDelivered, i) => (
            <CardDelivered
              key={projectDelivered.id}
              project={projectDelivered}
              index={i}
              length={projects.length}
            />
          ))}
        </div>
        <Button
          styles={{ margin: '3rem 0', alignSelf: 'center' }}
          href="/enterprises?page=deliveries"
        >
          Veja mais imóveis
        </Button>
      </div>
    </ContainerCSS>
  );
};
