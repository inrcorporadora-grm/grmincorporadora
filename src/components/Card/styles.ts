import styled from 'styled-components';
import type { CardProps } from '.';

interface ContainerCSSProps {
  size: CardProps['size'];
}

export const ContainerCSS = styled.div<ContainerCSSProps>`
  overflow: hidden;
  position: relative;

  color: rgb(var(--color-background100));

  width: ${({ size }) =>
    size === 'large'
      ? 'calc(100%)'
      : size === 'medium'
      ? 'calc(52%)'
      : 'calc(48% - 1rem)'};
  height: 21rem;
  transition: 0.2s ease-in-out 0.3s;

  > .card__content {
    display: flex;
    position: relative;
    transition: inherit;
    flex-direction: column;
    justify-content: flex-end;

    width: 100%;
    height: 100%;
    z-index: 2;
    padding: 1rem;
  }
  > .card__background {
    position: absolute;
    transition: inherit;
    user-select: none;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .overlay {
      position: relative;
      background-color: black;

      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0.4;
    }
  }

  &:hover {
    > .card__background {
      transform: scale(1.1);
    }
  }

  @media (max-width: ${({ theme }) => theme.mediaQueries.maxMobile}) {
    width: 100%;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`;
