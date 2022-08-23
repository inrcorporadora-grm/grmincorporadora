import styled from 'styled-components';

export const ContainerCSS = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 3rem 0 2rem;

  > section {
    &:last-child {
      display: flex;
    }
  }
  hr {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.mediaQueries.maxMobile}) {
    text-align: center;
    flex-direction: column;

    > section {
      > section {
        margin: 0;
      }
      &:last-child {
        flex-direction: column;
      }
    }
    hr {
      margin: 1rem 0;
      display: block;
    }
  }
`;
