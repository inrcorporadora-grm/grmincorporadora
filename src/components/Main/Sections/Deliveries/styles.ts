import styled from 'styled-components';

export const ContainerCSS = styled.section`
  background-color: rgb(var(--color-background300));
  margin-top: var(--section-margin);

  > div {
    display: flex;
    flex-direction: column;

    > .projects {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      > .card {
        margin: 0.5rem;

        &:hover,
        &:focus {
          .card__content-hidden {
            height: var(--card-hidden-height);
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
  }
`;
