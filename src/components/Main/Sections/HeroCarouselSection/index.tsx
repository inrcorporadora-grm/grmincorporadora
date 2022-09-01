import type { iProject } from 'types/iProject';
import type { iImage } from 'types/iImage';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { imageMock } from '@utils/imageMock';

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
  const [slides, setSlides] = useState<iImage[] | iProject[] | undefined>(
    Array.isArray(slidesProps)
      ? projects?.filter((project) => slidesProps.includes(project.id))
      : [slidesProps],
  );

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
          {slides.map((slide, i) => (
            <CarouselItem i={i + 1} amountSlides={slides.length} key={slide.id}>
              {slide.is === 'project' && (
                <CarouselContent className="mx-w">
                  <span
                    style={{
                      textTransform: 'uppercase',
                    }}
                  >
                    {slide.status === 'new' ? 'lançamento' : 'entregues'}
                  </span>
                  <TitleCSS weight="700" style={{ textTransform: 'uppercase' }}>
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
                  <span style={{ textTransform: 'uppercase' }}>
                    {slide.address && `${slide.address} - `} {slide.locale}
                  </span>
                </CarouselContent>
              )}

              <HeroCarouselBackground>
                <Image
                  src={
                    (slide.is === 'project'
                      ? (slide.image.url as string)
                      : slide.url) || (imageMock.url as string)
                  }
                  alt={slide.is === 'project' ? slide.image.alt : slide.alt}
                  draggable={false}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </HeroCarouselBackground>
            </CarouselItem>
          ))}
        </HeroCarousel>
      )}

      {hasEdit && slides && (
        <Edit slides={slides} setSlides={setSlides} projects={projects} />
      )}
    </section>
  );
};
