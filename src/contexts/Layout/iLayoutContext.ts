import type { iTheme } from 'types/iTheme';

export interface iLayoutContext {
  currTheme: iTheme;
  currWidth: number;
  isSpecialPage: boolean;
  isUserAdmin: boolean;
  setIsUserAdmin: (isUserAdmin: boolean) => void;
}
