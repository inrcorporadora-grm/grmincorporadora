import { createGlobalStyle } from 'styled-components';

const ColorsCSS = createGlobalStyle`
  :root {
    --color-primary: ${({ theme }) => theme.colors.primary};
    --color-text100: ${({ theme }) => theme.colors.text100};
    --color-text300: ${({ theme }) => theme.colors.text300};
    --color-text600: ${({ theme }) => theme.colors.text600};
    --color-text900: ${({ theme }) => theme.colors.text900};
    --color-background100: ${({ theme }) => theme.colors.background100};
    --color-background300: ${({ theme }) => theme.colors.background300};
    --color-background600: ${({ theme }) => theme.colors.background600};
    --color-background900: ${({ theme }) => theme.colors.background900};
  }
`;
const FontsCSS = createGlobalStyle`
  :root {
    --font-size: ${({ theme }) => theme.fonts.size};
    --font-primary: ${({ theme }) => theme.fonts.primary};
  }
`;
const RootCSS = createGlobalStyle`
  :root {
    --max-width: ${({ theme }) => theme.maxWidth};
    --header-height: ${({ theme }) => theme.header.desktopHeight};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    overflow-x: hidden;
    font-size: var(--font-size);
  }
  body {
    overflow-x: hidden;
    padding: 0 !important;
    color: rgb(var(--color-text600));
    font-family: var(--font-primary);
    background-color: rgb(var(--color-background100));
  }
  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    font-size: 1rem;
  }
  a {
    color: inherit;
    text-decoration: none;
    &:hover,
    &:focus,
    &:active {
      text-decoration: underline;
    }
  }
  abbr {
    text-decoration: none;
  }
  ul,
  li {
    list-style: none;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-primary);
  }

  .ql-align-center {
    text-align: center;
  }
  .ql-align-right {
    text-align: right;
  }
  .ql-align-justify {
    text-align: justify;
  }
  .ql-container {
    font-size: 2rem !important;
  }

  .mob-visible {
    display: none;
    @media (max-width: ${({ theme }) => theme.mediaQueries.maxMobile}) {
      display: block;
    }
  }
  .tab-visible {
    display: none;
    @media (min-width: ${({ theme }) => theme.mediaQueries.minMobile}) {
      display: block;
    }
  }
  .mx-w {
    margin: 0 auto;
    max-width: calc(100% - 2rem); // 100% - margin-left (1rem) - margin-right (1rem)
    @media (min-width: 1024px) {
      max-width: var(--max-width);
      margin: 0 auto;
    }
  }

  @media (min-width: ${({ theme }) => theme.mediaQueries.minTablet}) {
    html {
      margin: 0 auto;
    }
  }
`;

export const GlobalStyles = {
  ColorsCSS,
  FontsCSS,
  RootCSS,
};
