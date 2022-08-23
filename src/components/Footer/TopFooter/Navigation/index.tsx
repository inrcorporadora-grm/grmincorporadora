import Link from 'next/link';
import { ParagraphCSS } from '@stylesComponents/Texts';

import { ContainerCSS } from './styles';

export const Navigation = () => {
  return (
    <ContainerCSS>
      <ParagraphCSS bold>links rápidos</ParagraphCSS>

      <nav>
        <Link href="/">home</Link>
        <Link href="/about">quem somos</Link>
        <Link href="/enterprises">empreendimentos</Link>
        <Link href="/contact">contato</Link>
        <Link href="/land">ofereça seu terreno</Link>
      </nav>
    </ContainerCSS>
  );
};
