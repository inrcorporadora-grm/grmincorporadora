import { TopFooter } from './TopFooter';
import { ContainerCSS } from './styles';

export const Footer = () => {
  return (
    <ContainerCSS>
      <TopFooter />
      <section className="bottom">
        <p>&copy; GRM INCORPORADORA, 2020. TODOS OS DIREITOS RESERVADOS.</p>
      </section>
    </ContainerCSS>
  );
};
