import type { iProject } from 'types/iProject';
import Image from 'next/image';
import { imageMock } from '@utils/imageMock';

import {
  Carousel,
  CarouselBackground,
  CarouselItem,
} from '@components/Carousel';
import { SubTitleCSS } from '@stylesComponents/Texts';

interface GalleryProps {
  title: string;
  images: iProject['gallery'];
}

export const Gallery = ({ images, title }: GalleryProps) => {
  return (
    <section className="gallery-images">
      <SubTitleCSS>{title}</SubTitleCSS>

      <Carousel
        amountSlides={images!.length}
        aria-label={`slides das imagens: ${title}`}
      >
        {images!.map((image, i) => (
          <CarouselItem
            key={image.id}
            id={image.id}
            i={i}
            amountSlides={images!.length}
          >
            <CarouselBackground>
              <Image
                src={image.url || (imageMock.url as string)}
                alt={image.alt}
                draggable={false}
                layout="fill"
                objectFit="cover"
                priority
              />
              <span className="alt-image">{image.alt}</span>
            </CarouselBackground>
          </CarouselItem>
        ))}
      </Carousel>
    </section>
  );
};
