import { useCallback, useEffect, useRef, useState } from 'react';
import { toggleClassNameFocusableItems } from '@utils/toggleClassNameFocusableItems';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ClassNames from 'embla-carousel-class-names';

import { HrCSS } from '@stylesComponents/Hr';
import { NextButton, PrevButton } from './CarouselButtons';
import { ContainerCSS } from './styles';

interface CarouselProps {
  amountSlides: number;
  disabledClasses?: string;
  children: React.ReactNode;
  'aria-label': string;
  showHiddenSlides?: boolean;
  loopOff?: boolean;
}

export const Carousel = ({
  showHiddenSlides,
  disabledClasses,
  amountSlides,
  children,
  loopOff,
  ...rest
}: CarouselProps) => {
  const [emblaRef, embla] = useEmblaCarousel(
    {
      loop: amountSlides > 1 && !loopOff,
      align: 'center',
      draggable: amountSlides > 1,
      skipSnaps: false,
      active: true,
    },
    [
      Autoplay({ delay: 10000 }), // 10 seconds
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
      if (slide.classList.contains('is-selected')) {
        toggleClassNameFocusableItems(showedSlide, 'visible', disabledClasses);
      } else {
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
  useEffect(() => {
    if (!loopOff) {
      embla?.reInit();
      onScroll();
    }
  });

  return (
    <ContainerCSS
      className="embla mx-w"
      tabIndex={0}
      aria-roledescription="slides"
      showHiddenSlides={showHiddenSlides}
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
