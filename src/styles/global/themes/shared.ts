import type { iSharedThemeOptions } from 'types/iTheme';

export const BREAKPOINTS = {
  $MAX_MOBILE: 768,
  $MAX_TABLET: 890,
  $MIN_TABLET: 891,
  $MIN_MOBILE: 769,
};

export const sharedTheme: iSharedThemeOptions = {
  maxWidth: '52rem',

  header: {
    desktopHeight: '5rem',
  },
  fonts: {
    size: '16px',
    primary: '"Yantramanav", sans-serif',
  },
  mediaQueries: {
    maxMobile: `${BREAKPOINTS.$MAX_MOBILE}px`,
    maxTablet: `${BREAKPOINTS.$MAX_TABLET}px`,
    minTablet: `${BREAKPOINTS.$MIN_TABLET}px`,
    minMobile: `${BREAKPOINTS.$MIN_MOBILE}px`,
  },
};
