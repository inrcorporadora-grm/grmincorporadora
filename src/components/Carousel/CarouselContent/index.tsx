import { ContainerCSS } from './styles';

interface CarouselContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CarouselContent = ({
  children,
  className,
}: CarouselContentProps) => {
  return (
    <ContainerCSS className={`slide__content ${className}`}>
      {children}
    </ContainerCSS>
  );
};
