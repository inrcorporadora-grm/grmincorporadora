import type { iProject } from 'types/iProject';
import type { iImage } from 'types/iImage';

import { useLayoutContext } from '@contexts/Layout/useLayoutContext';
import { imageMock } from '@utils/imageMock';

import { Loading } from '@components/Loading';
import { HeroCarouselSection } from './Sections/HeroCarouselSection';
import { ContainerCSS } from './styles';

export interface MainProps {
  slides?: string[] | iImage;
  projects?: iProject[];
  children: React.ReactNode;
  isLoading?: boolean;
  blockEdit?: boolean;
}

export const Main = ({
  slides,
  projects,
  isLoading,
  children,
  blockEdit,
}: MainProps) => {
  const { isSpecialPage, isUserAdmin } = useLayoutContext();

  return (
    <ContainerCSS id="main" tabIndex={0}>
      {isLoading && <Loading />}
      {!isSpecialPage && (
        <HeroCarouselSection
          slides={isLoading || !slides ? imageMock : slides}
          projects={isLoading ? undefined : projects}
          hasEdit={!blockEdit && isUserAdmin}
        />
      )}
      {children}
    </ContainerCSS>
  );
};
