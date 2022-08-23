import styled from 'styled-components';

export const ContainerCSS = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(var(--color-background900), 0.9);

  > div {
    display: flex;
    > .dot {
      display: block;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      margin: 0.3rem;
      border: 0.2rem solid rgba(var(--color-background100), 0.5);
      animation: fade-zoom 0.5s ease-in-out infinite alternate;
      animation-delay: 0.3s;

      &:first-child {
        animation-delay: 0s;
      }
      &:last-child {
        animation-delay: 0.6s;
      }
    }

    &.logo {
      margin-top: 2rem;
      animation: pulse 0.5s ease-in-out infinite alternate;
    }
  }

  @keyframes fade-zoom {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes pulse {
    0% {
      opacity: 0.8;
      transform: scale(1.9);
    }
    100% {
      opacity: 1;
      transform: scale(2);
    }
  }
`;
