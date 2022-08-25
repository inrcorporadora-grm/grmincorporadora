import { css } from 'styled-components';

export const LandCSS = css`
  > .land {
    margin-bottom: 4rem;

    form {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      .cep {
        > button {
          text-align: left;
          width: 100%;
          opacity: 0.7;
          font-size: 1rem;
          font-weight: 700;
          margin-left: 1rem;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
`;
