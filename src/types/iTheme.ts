export interface iSharedThemeOptions {
  maxWidth: string;

  header: {
    desktopHeight: string;
  };
  fonts: {
    size: string;
    primary: string;
  };
  mediaQueries: {
    maxMobile: string;
    maxTablet: string;
    minTablet: string;
    minMobile: string;
  };
}

export interface iTheme extends iSharedThemeOptions {
  name: 'default';

  colors: {
    primary: string;
    text100: string;
    text300: string;
    text600: string;
    text900: string;
    background100: string;
    background300: string;
    background600: string;
    background900: string;
  };
}
