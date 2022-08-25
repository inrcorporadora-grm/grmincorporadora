import styled from 'styled-components';

export const ContainerCSS = styled.section`
  > .carousel {
    display: flex;
    flex-direction: column;
    align-items: center;

    .carousel-content {
      justify-content: unset;
      background-color: rgba(var(--color-background900), 0.6);

      width: 16.5rem;
      height: calc(100% - 5rem);
      padding: 2.5rem;
      margin-left: 3rem;

      > hr {
        background-color: rgb(var(--color-background100));
        margin: 1rem 0 1rem;
      }
      > p {
        margin-bottom: 0 !important;
      }
      > button {
        align-self: center;
      }

      > .info {
        height: 100%;
      }

      @media (max-width: ${({ theme }) => theme.mediaQueries.maxMobile}) {
        margin-left: 1rem;
      }
    }
  }
`;
