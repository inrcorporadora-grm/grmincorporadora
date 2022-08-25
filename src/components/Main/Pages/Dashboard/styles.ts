import { css } from 'styled-components';

export const DashboardCSS = css`
  > .dashboard {
    margin-top: calc(var(--header-height));
    margin-bottom: 4rem;

    > div {
      display: flex;
      align-items: flex-end;
      flex-direction: column;

      max-width: 80%;
      margin: 0 auto;

      @media (max-width: ${({ theme }) => theme.mediaQueries.maxTablet}) {
        max-width: 100%;
        margin: 0 2rem;
      }
    }
  }
`;
