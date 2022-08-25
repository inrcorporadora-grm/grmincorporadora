import { ButtonLink } from '@components/Buttons/ButtonLink';
import { HrCSS } from '@stylesComponents/Hr';
import { ContainerCSS } from './styles';

import type { PageQuery } from '..';

interface NavigationProps {
  page: string;
  setPage: (page: PageQuery) => void;
}

export const Navigation = ({ page, setPage }: NavigationProps) => {
  return (
    <ContainerCSS>
      <ButtonLink
        onClick={() => setPage('in-progress')}
        active={page === 'in-progress'}
        href="/enterprises?page=in-progress"
      >
        Em Andamento
      </ButtonLink>
      <HrCSS direction="vertical" size="100%" stroke="2px" />
      <ButtonLink
        onClick={() => setPage('deliveries')}
        active={page === 'deliveries'}
        href="/enterprises?page=deliveries"
      >
        Entregues
      </ButtonLink>
    </ContainerCSS>
  );
};
