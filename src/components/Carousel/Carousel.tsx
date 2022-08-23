import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ClassNames from 'embla-carousel-class-names';
import { toggleClassNameFocusableItems } from '@utils/toggleClassNameFocusableItems';

import { HrCSS } from '@stylesComponents/Hr';
import { NextButton, PrevButton } from './CarouselButtons';
import { ContainerCSS } from './styles';

interface CarouselProps {
  showHiddenSlides?: boolean;
  amountSlides: number;
  disabledClasses?: string;
  children: React.ReactNode;
  'aria-label': string;
}

export const Carousel = ({
  showHiddenSlides,
  disabledClasses,
  amountSlides,
  children,
  ...rest
}: CarouselProps) => {
  const [emblaRef, embla] = useEmblaCarousel(
    {
      loop: amountSlides > 1,
      align: 'center',
      draggable: amountSlides > 1,
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 10000, // 10 seconds
      }),
      ClassNames(),
    ],
  );
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const emblaContainerRef = useRef<HTMLDivElement>(null);
  const emblaSlides = emblaContainerRef.current
    ?.childNodes as NodeListOf<HTMLElement>;

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);
  const onScroll = useCallback(() => {
    if (!embla) return;
    emblaSlides?.forEach((slide) => {
      const showedSlide = slide;
      const slidePositions = showedSlide.getBoundingClientRect();

      const startSlide = slidePositions.x;
      const endSlide = slidePositions.x + slidePositions.width;

      if (startSlide >= 0 && endSlide <= window.innerWidth) {
        showedSlide.classList.add('slide-selected');
        toggleClassNameFocusableItems(showedSlide, 'visible', disabledClasses);
      } else {
        showedSlide.classList.remove('slide-selected');
        toggleClassNameFocusableItems(showedSlide, 'hidden', disabledClasses);
      }
    });
  }, [embla, emblaSlides, disabledClasses]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
    embla.on('scroll', onScroll);
    onSelect();
    onScroll();
  }, [embla, onSelect, onScroll]);

  return (
    <ContainerCSS
      className="embla"
      showHiddenSlides={showHiddenSlides}
      tabIndex={0}
      aria-roledescription="slides"
      {...rest}
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div
          className="embla__container"
          aria-live="polite"
          ref={emblaContainerRef}
        >
          {children}
        </div>
      </div>
      {amountSlides > 1 && (
        <div className="embla__arrows">
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <HrCSS direction="vertical" stroke="2px" size="100%" />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
      )}
    </ContainerCSS>
  );
};
