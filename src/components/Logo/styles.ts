import styled, { css } from 'styled-components';

interface ContainerCSSProps {
  variant?: 'colorized' | 'default';
}

export const ContainerCSS = styled.div<ContainerCSSProps>`
  cursor: pointer;
  width: 9rem;

  ${({ variant }) =>
    variant === 'colorized' &&
    css`
      width: 11rem;
      filter: invert(1);
    `}
`;
