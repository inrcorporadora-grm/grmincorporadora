import { Anchor } from '@components/Anchor';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@stylesComponents/icons/Medias';

import { ContainerCSS } from './styles';

export const Medias = () => {
  return (
    <ContainerCSS>
      <span>redes sociais</span>
      <Anchor href="https://instagram.com/" ariaLabel="LinkedIn">
        <LinkedInIcon />
      </Anchor>
      <Anchor href="https://facebook.com/" ariaLabel="Facebook">
        <FacebookIcon />
      </Anchor>
      <Anchor href="https://br.linkedin.com/" ariaLabel="Instagram">
        <InstagramIcon />
      </Anchor>
    </ContainerCSS>
  );
};
