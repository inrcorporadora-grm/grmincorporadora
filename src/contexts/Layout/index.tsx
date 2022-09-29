import { createContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '@globalStyles';
import { defaultTheme } from '@globalStyles/themes/default';

import { getCookie } from '@services/cookies';
import { fetcherSWR } from '@services/fetchers';
import { useGetProjectImage } from '@hooks/useGetProjectImage';
import { iProject } from 'types/iProject';
import type { iLayoutContext } from './iLayoutContext';

export const LayoutContext = createContext<iLayoutContext>(
  {} as iLayoutContext,
);

interface LayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [currWidth, setCurrWidth] = useState(0);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const { pathname } = useRouter();
  const isSpecialPage =
    pathname.includes('/admin') || pathname.includes('_error');

  const { data: projectsDb } = fetcherSWR.useGet<iProject[]>('/api/projects');
  const [projects, projectsLoading, setProjects] =
    useGetProjectImage(projectsDb);

  useEffect(() => {
    setCurrWidth(window.innerWidth);
    window.addEventListener('resize', () => setCurrWidth(window.innerWidth));

    setIsUserAdmin(!!getCookie(null, process.env.NEXT_PUBLIC_ADMIN_COOKIE!));

    return () => window.removeEventListener('resize', () => setCurrWidth(0));
  }, []);

  const contextValue = useMemo(
    () => ({
      currTheme: defaultTheme,
      currWidth,
      isSpecialPage,
      isUserAdmin,
      setIsUserAdmin,
      projects: {
        projects,
        loading: projectsLoading,
        set: setProjects,
      },
    }),
    [
      currWidth,
      isUserAdmin,
      isSpecialPage,
      projects,
      projectsLoading,
      setProjects,
    ],
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles.ColorsCSS />
      <GlobalStyles.FontsCSS />
      <GlobalStyles.RootCSS />

      <LayoutContext.Provider value={contextValue}>
        {children}
      </LayoutContext.Provider>
    </ThemeProvider>
  );
};
