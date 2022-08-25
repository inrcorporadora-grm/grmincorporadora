import type { iProject } from 'types/iProject';

import { Button } from '@components/Buttons/Button';
import { Card } from '@components/Card';

import { ParagraphCSS } from '@stylesComponents/Texts';
import { ContentCSS } from './styles';

interface CardDeliveredProps {
  project: iProject;
  index: number;
  length: number;
}

export const CardDelivered = ({
  project,
  index,
  length,
}: CardDeliveredProps) => {
  return (
    <Card
      aria-label="cartão de projeto entregue"
      image={project.image}
      name={project.name}
      size={
        length > 1
          ? index === 0
            ? 'small'
            : index === 1
            ? 'medium'
            : 'large'
          : 'large'
      }
    >
      <ContentCSS className="card__content-hidden">
        <ParagraphCSS size="1.5rem" uppercase>
          {project.locale}
        </ParagraphCSS>
        <div>
          <ParagraphCSS bold size="1.3rem">
            {project.dimensions}
          </ParagraphCSS>
          <span style={{ margin: '0 0.5rem' }}>-</span>
          <ParagraphCSS size="1.3rem" className="info">
            <span
              style={{
                display: 'inline',
                textTransform: 'uppercase',
              }}
            >
              <span>{project.infos[0].text}</span>
            </span>
          </ParagraphCSS>
        </div>

        <Button href={`/enterprises/${project.id}`}>Conheça Agora</Button>
      </ContentCSS>
    </Card>
  );
};
