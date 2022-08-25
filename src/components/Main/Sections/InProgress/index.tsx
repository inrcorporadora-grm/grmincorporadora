import { TitleCSS } from '@stylesComponents/Texts';
import { CarouselProjects, type CarouselProjectsProps } from './Carousel';
import { ContainerCSS } from './styles';

export const InProgress = (props: CarouselProjectsProps) => {
  return (
    <ContainerCSS>
      <div className="mx-w">
        <TitleCSS line uppercase style={{ marginBottom: '4rem' }}>
          Empreendimentos <br />
          <span style={{ fontWeight: '700' }}>em andamento</span>
        </TitleCSS>
      </div>
      <CarouselProjects {...props} />
    </ContainerCSS>
  );
};
