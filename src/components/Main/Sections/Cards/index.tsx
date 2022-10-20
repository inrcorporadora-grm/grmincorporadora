import type { iProject } from 'types/iProject';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Card } from '@components/Card';
import { Button } from '@components/Buttons/Button';
import { ButtonLink } from '@components/Buttons/ButtonLink';

import { ParagraphCSS, TitleCSS } from '@stylesComponents/Texts';
import { Navigation } from './Navigation';
import { ContainerCSS } from './styles';

interface CardsProps {
  projects: iProject[];
}
export type PageQuery = 'in-progress' | 'deliveries';

const DEFAULT_PAGE = 'in-progress';

export const Cards = ({ projects }: CardsProps) => {
  const router = useRouter();
  const [amountCards, setAmountCards] = useState(6);

  const [page, setPage] = useState<PageQuery>(
    (router.query.page as PageQuery) || DEFAULT_PAGE,
  );
  const [pageProjects, setPageProjects] = useState(
    projects.filter((project) => project.status === 'new'),
  );

  const getLabel = useCallback(() => {
    const currentLabel = page === DEFAULT_PAGE ? 'lançamento' : 'entregue';
    return currentLabel;
  }, [page]);

  useEffect(() => {
    setPageProjects(
      projects.filter(
        (project) =>
          project.status === (page === DEFAULT_PAGE ? 'new' : 'delivered'),
      ),
    );
    setAmountCards(6);
  }, [page, projects]);

  return (
    <ContainerCSS>
      <div className="mx-w">
        <Navigation page={page} setPage={setPage} />
        <TitleCSS line uppercase style={{ marginBottom: '4rem' }}>
          {`${getLabel()}s`}
        </TitleCSS>
      </div>
      <div className="cards__container">
        {pageProjects.map(
          (project, i) =>
            i < amountCards && (
              <Card
                key={project.id}
                image={project.image}
                name={project.name}
                size="small"
                aria-label={`cartão de projeto. status: ${getLabel()}`}
              >
                <ParagraphCSS
                  uppercase
                  style={{ fontWeight: '400', marginBottom: '2rem' }}
                >
                  {getLabel()}
                </ParagraphCSS>

                <Button
                  href={
                    project.website
                      ? project.website
                      : `/enterprises/${project.id}`
                  }
                  targetBlank={!!project.website}
                >
                  Conheça Agora
                </Button>
              </Card>
            ),
        )}
      </div>
      <div className="see-more">
        {amountCards < pageProjects.length && (
          <ButtonLink active onClick={() => setAmountCards((prev) => prev + 4)}>
            Ver Mais
          </ButtonLink>
        )}
      </div>
    </ContainerCSS>
  );
};
