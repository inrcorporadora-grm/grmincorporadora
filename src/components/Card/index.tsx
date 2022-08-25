import type { iProject } from 'types/iProject';
import Image from 'next/image';
import { imageMock } from '@utils/imageMock';

import { TitleCSS } from '@stylesComponents/Texts';
import { ContainerCSS } from './styles';

export interface CardProps {
  image: iProject['image'];
  name: iProject['name'];
  children?: React.ReactNode;
  size: 'large' | 'medium' | 'small';
  'aria-label': string;
}

export const Card = ({ image, name, children, size, ...rest }: CardProps) => {
  return (
    <ContainerCSS size={size} className="card" tabIndex={0} {...rest}>
      <div className="card__content">
        <TitleCSS
          size="2rem"
          style={{ textTransform: 'uppercase', lineHeight: '2rem' }}
        >
          {name.localeType && (
            <>
              {name.localeType}
              <br />
            </>
          )}
          <span style={{ fontWeight: '700' }}>{name.name}</span>
        </TitleCSS>
        {children}
      </div>

      <div className="card__background">
        <div className="overlay" />
        <Image
          src={image.url || (imageMock.url as string)}
          alt={image.alt}
          draggable={false}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </ContainerCSS>
  );
};
