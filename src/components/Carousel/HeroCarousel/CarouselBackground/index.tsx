import { ContainerCSS } from './styles';

interface HeroCarouselBackgroundProps {
  children: React.ReactNode;
}

export const HeroCarouselBackground = ({
  children,
}: HeroCarouselBackgroundProps) => {
  return (
    <ContainerCSS className="slide__background">
      <div className="overlay" />
      {children}
    </ContainerCSS>
  );
};
