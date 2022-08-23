import { ContainerCSS } from './styles';

interface CarouselItemProps {
  i: number;
  id?: string;
  children: React.ReactNode;
  amountSlides: number;
}

export const CarouselItem = ({
  i,
  id,
  children,
  amountSlides,
}: CarouselItemProps) => {
  return (
    <ContainerCSS
      id={id}
      aria-label={`${i} de ${amountSlides}`}
      tabIndex={0}
      className="embla__slide"
      role="group"
      aria-roledescription="slide"
    >
      {children}
    </ContainerCSS>
  );
};
