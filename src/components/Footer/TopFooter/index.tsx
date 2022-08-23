import { Logo } from '@components/Logo';
import { HrCSS } from '@stylesComponents/Hr';

import { Medias } from './Medias';
import { Navigation } from './Navigation';
import { Contact } from './Contact';

import { ContainerCSS } from './styles';

export const TopFooter = () => {
  return (
    <ContainerCSS className="mx-w">
      <section>
        <Logo variant="colorized" />
        <Medias />
      </section>
      <HrCSS direction="horizontal" stroke="2px" size="100%" />
      <section>
        <Navigation />
        <HrCSS direction="horizontal" stroke="2px" size="100%" />
        <Contact />
      </section>
    </ContainerCSS>
  );
};
