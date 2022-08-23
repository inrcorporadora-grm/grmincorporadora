import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ClassNames from 'embla-carousel-class-names';

import { CarouselDotButton } from '../CarouselButtons';
import { ContainerCSS } from './styles';

interface CarouselProps {
  amountSlides: number;
  children: React.ReactNode;
}

export const HeroCarousel = ({ amountSlides, children }: CarouselProps) => {
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, draggable: amountSlides > 1, skipSnaps: false },
    [
      Autoplay({
        delay: 10000, // 10 seconds
      }),
      ClassNames(),
    ],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index),
    [embla],
  );
  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);
  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
  }, [embla, setScrollSnaps, onSelect]);
  useEffect(() => {
    if (!embla) return;
    setScrollSnaps(embla.scrollSnapList());
  }, [amountSlides, embla]);

  return (
    <ContainerCSS
      className="embla"
      ref={emblaRef}
      tabIndex={0}
      aria-label="slides principais do site."
      aria-roledescription="slides"
    >
      <div className="embla__container">{children}</div>
      <div className="embla__dots">
        {amountSlides > 1 &&
          scrollSnaps.map((id, index) => (
            <CarouselDotButton
              key={id}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
      </div>
    </ContainerCSS>
  );
};
