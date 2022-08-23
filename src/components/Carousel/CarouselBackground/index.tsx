import { ContainerCSS } from './styles';

interface CarouselBackgroundProps {
  children: React.ReactNode;
}

export const CarouselBackground = ({ children }: CarouselBackgroundProps) => {
  return <ContainerCSS className="slide__background">{children}</ContainerCSS>;
};
