import styled, { css } from 'styled-components';

interface ContainerCSSProps {
  isSpecialPage: boolean;
}

export const ContainerCSS = styled.header<ContainerCSSProps>`
  position: absolute;
  color: rgb(var(--color-text100));

  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  z-index: 10;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    > div {
      align-self: center;
    }
    h1 {
      margin-top: 0;
    }

    > .hamburger {
      z-index: 2;
      color: rgb(var(--color-text100));
    }
  }

  #menu-check:checked ~ div > div > .navigation {
    animation: open 0.2s ease-in-out forwards;
  }

  ${({ isSpecialPage }) =>
    isSpecialPage &&
    css`
      background-color: rgba(var(--color-text900), 0.8);
      > div {
        max-width: 100%;
        margin: 0 2rem;
      }
    `}
`;
