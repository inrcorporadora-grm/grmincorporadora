import type { iProject } from 'types/iProject';

import Image from 'next/image';
import { imageMock } from '@utils/imageMock';
import {
  Carousel,
  CarouselBackground,
  CarouselContent,
  CarouselItem,
} from '@components/Carousel';
import { Button } from '@components/Buttons/Button';

import { HrCSS } from '@stylesComponents/Hr';
import { ParagraphCSS } from '@stylesComponents/Texts';

export interface CarouselProjectsProps {
  projects: iProject[];
}

export const CarouselProjects = ({ projects }: CarouselProjectsProps) => {
  return (
    <div className="carousel">
      <Carousel
        showHiddenSlides
        amountSlides={projects.length}
        disabledClasses="Mui-disabled(button)"
        aria-label="slides de projetos em andamento"
      >
        {projects.map((projectInProgress, i) => (
          <CarouselItem
            key={projectInProgress.id}
            id={projectInProgress.id}
            amountSlides={projects.length}
            i={i + 1}
          >
            <CarouselContent className="carousel-content">
              <ParagraphCSS
                size="1.5rem"
                uppercase
                style={{ fontWeight: '700' }}
              >
                {projectInProgress.name.name}
              </ParagraphCSS>
              <ParagraphCSS size="1.5rem" uppercase>
                {projectInProgress.locale}
              </ParagraphCSS>
              <HrCSS direction="horizontal" stroke="2px" size="90%" />
              <ParagraphCSS bold size="1.3rem">
                {projectInProgress.dimensions}
              </ParagraphCSS>
              <HrCSS direction="horizontal" stroke="2px" size="90%" />
              <ParagraphCSS size="1.3rem" className="info">
                {projectInProgress.infos.map((info, j, arr) => (
                  <span
                    key={info.id}
                    style={{
                      display: 'inline',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{info.text}</span>
                    {j + 1 < arr.length && <br />}
                  </span>
                ))}
              </ParagraphCSS>

              <Button href={`/enterprises/${projectInProgress.id}`}>
                Conheça Agora
              </Button>
            </CarouselContent>
            <CarouselBackground>
              <Image
                src={projectInProgress.image.url || (imageMock.url as string)}
                alt={projectInProgress.image.alt}
                draggable={false}
                layout="fill"
                objectFit="cover"
                priority
              />
            </CarouselBackground>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
};
