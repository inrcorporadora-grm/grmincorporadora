import { iProject } from 'types/iProject';
import type { iTheme } from 'types/iTheme';

export interface iLayoutContext {
  currTheme: iTheme;
  currWidth: number;
  isSpecialPage: boolean;
  isUserAdmin: boolean;
  setIsUserAdmin: (isUserAdmin: boolean) => void;
  projects: {
    projects: iProject[] | undefined;
    loading: boolean;
    set: React.Dispatch<React.SetStateAction<iProject[] | undefined>>;
  };
}
