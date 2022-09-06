import { Anchor } from '@components/Anchor';
import {
  // FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@stylesComponents/icons/Medias';

import { ContainerCSS } from './styles';

export const Medias = () => {
  return (
    <ContainerCSS>
      <span>redes sociais</span>
      <Anchor
        href="https://www.instagram.com/grm_incorporadora/"
        ariaLabel="LinkedIn"
      >
        <LinkedInIcon />
      </Anchor>
      {/* <Anchor href="https://facebook.com/" ariaLabel="Facebook">
        <FacebookIcon />
      </Anchor> */}
      <Anchor
        href="https://www.linkedin.com/company/grm-incorporadora/?viewAsMember=true"
        ariaLabel="Instagram"
      >
        <InstagramIcon />
      </Anchor>
    </ContainerCSS>
  );
};
