import styled from 'styled-components';

interface ContainerCSSProps {
  isActive: boolean;
}

export const ContainerCSS = styled.button<ContainerCSSProps>`
  opacity: ${({ isActive }) => (isActive ? '1' : '0.5')};
  text-transform: uppercase;

  font-size: 0.9rem;
  transition: 0.1s ease-in-out;

  &:hover,
  &:focus,
  &:active {
    opacity: ${({ isActive }) => (isActive ? '1' : '0.7')};
    text-decoration: underline;
  }
`;
