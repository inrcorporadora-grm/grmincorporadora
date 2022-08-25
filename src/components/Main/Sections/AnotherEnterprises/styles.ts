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
        font-size: 1.2rem;
        padding: 1rem 0;
      }
    }
  }
`;
