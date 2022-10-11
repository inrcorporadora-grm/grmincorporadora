import type { iProject } from 'types/iProject';
import type { iImage } from 'types/iImage';

import { useEffect, useState } from 'react';
import parser from 'html-react-parser';
import Image from 'next/image';
import { useLayoutContext } from '@contexts/Layout/useLayoutContext';
import { BREAKPOINTS } from '@globalStyles/themes/shared';
import { imageMock } from '@utils/imageMock';
import { getRealValue } from '@utils/getRealValue';
import { Button } from '@components/Buttons/Button';

import {
  HeroCarousel,
  HeroCarouselBackground,
  CarouselContent,
  CarouselItem,
} from '@components/Carousel';
import { ParagraphCSS, TitleCSS } from '@stylesComponents/Texts';
import { Edit } from './Edit';

interface HeroCarouselSectionProps {
  slides: iImage | string[];
  hasEdit: boolean;
  projects?: iProject[];
}

export const HeroCarouselSection = ({
  slides: slidesProps,
  hasEdit,
  projects,
}: HeroCarouselSectionProps) => {
  const { currWidth } = useLayoutContext();

  const [slides, setSlides] = useState<iImage[] | iProject[] | undefined>(
    Array.isArray(slidesProps)
      ? projects?.filter((project) => slidesProps.includes(project.id))
      : [slidesProps],
  );

  function handleImageSize(normal: string, mobile?: string | null) {
    if (currWidth <= BREAKPOINTS.$MAX_MOBILE && mobile) return mobile;
    return normal;
  }

  useEffect(() => {
    setSlides(
      Array.isArray(slidesProps)
        ? projects?.filter((project) => slidesProps.includes(project.id))
        : [slidesProps],
    );
  }, [projects, slidesProps]);

  return (
    <section style={{ paddingTop: 0, position: 'relative' }}>
      {slides && (
        <HeroCarousel amountSlides={slides.length}>
          {slides.map((slide, i) => {
            const backgroundImage =
              (slide.is === 'project'
                ? handleImageSize(
                    slide.image.url as string,
                    getRealValue(slide.image.urlMobile as string),
                  )
                : handleImageSize(
                    slide.url as string,
                    getRealValue(slide.urlMobile as string),
                  )) || (imageMock.url as string);

            return (
              <CarouselItem
                i={i + 1}
                amountSlides={slides.length}
                key={slide.id}
              >
                {slide.is === 'project' ? (
                  <CarouselContent className="mx-w">
                    <span
                      style={{
                        textTransform: 'uppercase',
                      }}
                    >
                      {slide.status === 'new' ? 'lançamento' : 'entregues'}
                    </span>
                    <TitleCSS
                      weight="700"
                      style={{ textTransform: 'uppercase' }}
                    >
                      {slide.name.name}
                    </TitleCSS>
                    <ParagraphCSS bold size="2.5rem">
                      {slide.infos.map((info, j, arr) => (
                        <span
                          key={info.id}
                          style={{
                            display: 'inline',
                            textTransform: 'uppercase',
                          }}
                        >
                          <span>
                            {info.abbr ? (
                              <abbr title={info.text} aria-label={info.text}>
                                {info.abbr}
                              </abbr>
                            ) : (
                              info.text
                            )}
                          </span>
                          {j + 1 < arr.length && <br />}
                        </span>
                      ))}
                      <span style={{ display: 'inline' }}>
                        {' '}
                        - {slide.dimensions}
                      </span>
                    </ParagraphCSS>
                    <span
                      style={{
                        textTransform: 'uppercase',
                        marginBottom: '2rem',
                      }}
                    >
                      {slide.address && `${slide.address} - `} {slide.locale}
                    </span>
                    <Button href={`/enterprises/${slide.id}`}>
                      Conheça Agora
                    </Button>
                  </CarouselContent>
                ) : (
                  <CarouselContent className="mx-w">
                    <div style={{ fontSize: '2.5rem' }}>
                      {slide.slideText ? parser(slide.slideText) : ''}
                    </div>
                  </CarouselContent>
                )}

                <HeroCarouselBackground>
                  <Image
                    src={backgroundImage}
                    alt={slide.is === 'project' ? slide.image.alt : slide.alt}
                    draggable={false}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </HeroCarouselBackground>
              </CarouselItem>
            );
          })}
        </HeroCarousel>
      )}

      {hasEdit && slides && (
        <Edit slides={slides} setSlides={setSlides} projects={projects} />
      )}
    </section>
  );
};
