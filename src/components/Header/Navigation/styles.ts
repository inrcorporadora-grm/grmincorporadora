import styled from 'styled-components';

export const ContainerCSS = styled.div`
  > nav {
    display: flex;
  }

  @media (max-width: 1024px) {
    overflow: hidden;
    position: absolute;
    background-color: rgb(var(--color-background900), 0.8);

    top: 5rem;
    right: 0;
    width: 15rem;
    height: fit-content;
    z-index: 2;
    padding: 1rem;
    border-radius: 0 0 0 1rem;
    animation: close 0.2s ease-in-out forwards;

    > nav {
      display: block;
      text-align: right;
    }
  }

  @keyframes close {
    0% {
      visibility: visible;
      opacity: 1;
      transform: translateY(0%);
    }
    100% {
      visibility: hidden;
      opacity: 0;
      transform: translateY(110%);
    }
  }
  @keyframes open {
    0% {
      visibility: hidden;
      opacity: 0;
      transform: translateY(110%);
    }
    100% {
      visibility: visible;
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;
