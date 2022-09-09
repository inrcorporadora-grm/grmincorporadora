import styled from 'styled-components';

export const ContainerCSS = styled.div`
  background-color: rgb(var(--color-background300));
  padding: 0 0 3rem;

  > h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
  > div {
    display: flex;
    justify-content: center;

    > div {
      display: flex;

      > hr {
        margin: 0 3rem;
      }
      > nav {
        display: flex;
        flex-direction: column;
        text-transform: uppercase;
        font-size: 1.1rem;
        padding: 1rem 0;

        a {
          margin: 0.2rem 0;
        }
      }
    }

    @media (max-width: ${({ theme }) => theme.mediaQueries.maxMobile}) {
      flex-direction: column;
      align-items: center;
      text-align: center;

      > div {
        flex-direction: column;
        width: 100%;

        > hr {
          width: 100%;
          height: 2px;
          margin: 0;
        }
      }
    }
  }
`;
