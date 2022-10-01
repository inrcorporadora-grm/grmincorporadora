import styled from 'styled-components';
import { ArrowDropRight } from '@styled-icons/remix-line/ArrowDropRight';

export const ArrowIcon = styled(ArrowDropRight)`
  width: 4rem;
  height: 4rem;
`;

export const ArrowButton = styled.button`
  color: rgb(var(--color-text600));
  opacity: 0.7;
  transition: 0.1s ease-in-out;

  &:hover,
  &:focus,
  &:active {
    opacity: 1;
    color: rgb(var(--color-primary));
  }
  &:active {
    transform: scale(0.95);
  }
  &:first-child:active {
    transform: rotate(180deg) scale(0.95) !important;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover,
    &:focus,
    &:active {
      color: rgb(var(--color-text600));
    }
    &:active {
      transform: scale(1);
    }
    &:first-child:active {
      transform: rotate(180deg) scale(1) !important;
    }
  }
`;
export const DotButtonCSS = styled.button`
  width: 0.6rem;
  height: 0.6rem;
  margin: 1rem 0.2rem;
  opacity: 0.5;
  border-radius: 50%;

  background-color: rgb(var(--color-text600));

  &.is-selected {
    opacity: 1;
  }
`;
