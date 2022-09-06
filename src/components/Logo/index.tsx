import Image from 'next/image';
import { useRouter } from 'next/router';
import { ContainerCSS } from './styles';

// import ImageLogoColorized from '../../assets/img/logo-colorized.png';
import ImageLogo from '../../assets/img/logo.png';

interface LogoProps {
  variant?: 'colorized' | 'default';
}

export const Logo = ({ variant }: LogoProps) => {
  const router = useRouter();

  const alt = 'GRM - logo vetorizado';

  return (
    <ContainerCSS
      aria-hidden
      onClick={() => router.push(router.asPath)}
      variant={variant || 'default'}
    >
      {variant === 'colorized' ? (
        <Image src={ImageLogo} alt={alt} />
      ) : (
        <Image src={ImageLogo} alt={alt} />
      )}
    </ContainerCSS>
  );
};
