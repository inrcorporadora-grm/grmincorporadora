import styled from 'styled-components';

export const ContainerCSS = styled.section`
  margin: 1rem 0 4rem;

  > .cards__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    > .card {
      margin: 1rem;
      height: 18rem;

      > .card__content {
        justify-content: center;
        padding: 0 3rem;
      }
    }
    @media (max-width: ${({ theme }) => theme.mediaQueries.maxMobile}) {
      padding: 0 1rem;
      > .card {
        > .card__content {
          padding: 0 1rem;
        }
      }
    }
  }
  > .see-more {
    text-align: center;
    > button {
      font-weight: 600;
    }
  }
`;
