import { Logo } from '@components/Logo';
import { ContainerCSS } from './styles';

export const Loading = () => {
  return (
    <ContainerCSS>
      <div>
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
      <div className="logo">
        <Logo />
      </div>
    </ContainerCSS>
  );
};
