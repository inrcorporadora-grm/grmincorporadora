import styled, { css } from 'styled-components';

interface ContainerCSSProps {
  isActive?: boolean;
}

export const ContainerCSS = styled.div<ContainerCSSProps>`
  text-transform: uppercase;
  opacity: 0.8;
  padding: 0 0.4rem;
  transition: 0.2s ease-in-out;

  &:hover,
  &:focus {
    opacity: 0.9;
    font-weight: 500;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      opacity: 1;
      font-weight: 500;

      &:hover,
      &:focus {
        opacity: 1;
      }
    `}
`;
