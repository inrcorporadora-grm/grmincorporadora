import type { iPage } from 'types/iPage';
import { fetcherSWR } from '@services/fetchers';

import { Main } from '@components/Main';
import { ParagraphCSS, SubTitleCSS } from '@stylesComponents/Texts';

const About = () => {
  const { data: pageProps, isValidating: pagePropsLoading } =
    fetcherSWR.useGet<iPage>('/api/pages/about');

  return (
    <Main slides={pageProps?.slides} isLoading={pagePropsLoading}>
      <section className="mx-w about">
        <ParagraphCSS>
          Com milhares de unidades construídas e vendidas por todo o Brasil, a
          GRM não para de expandir sua atuação com um único objetivo: melhorar a
          relação entre o morar e o viver, ressignificando espaços sempre a
          partir da perspectiva humana.
        </ParagraphCSS>
        <ParagraphCSS>
          Nossa inspiração em cada projeto tem este propósito:criar projetos
          especiais para clientes únicos. Para tal, construímos uma nova marca
          antenada com as mudanças, tendências e aspirações de cada um de nossos
          clientes para continuarmos a surpreendê-los. Entender seu momento,
          estilo de vida e o seu &quot;estado de espírito&quot; nos permite
          captar a essência das suas aspirações e criar uma forte identificação
          entre nosso projeto e o seu desejo de viver bem.
        </ParagraphCSS>

        <SubTitleCSS>QUAL A SUA PERSPECTIVA DE VIVER BEM?</SubTitleCSS>

        <ParagraphCSS style={{ marginBottom: '3rem' }}>
          A gente sabe que todo mundo tem um jeito único de viver bem. Por isso,
          nos inspiramos em cada um de vocês.
        </ParagraphCSS>

        <ParagraphCSS style={{ marginBottom: '3rem' }}>
          Muito prazer! Somos a <span className="bold">GRM Incorporadora</span>.
        </ParagraphCSS>
        <ParagraphCSS>
          <span className="bold">GRM Incorporadora</span>. Mudando com você.
        </ParagraphCSS>
      </section>
    </Main>
  );
};

export default About;
