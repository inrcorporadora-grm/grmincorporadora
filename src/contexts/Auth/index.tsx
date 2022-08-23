import type { iUser, iUserFirebase } from 'types/iUser';
import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { cookie } from '@services/cookies';
import { auth } from '@services/firebase';

import type { iAuthContext } from './iAuthContext';
import { useLayoutContext } from '../Layout/useLayoutContext';

export const AuthContext = createContext<iAuthContext>({} as iAuthContext);

const formatUser = (user: iUserFirebase): iUser => ({
  email: user.email!,
  uid: user.uid,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<iUser | null>(null);
  const { setIsUserAdmin } = useLayoutContext();
  const router = useRouter();

  function setSession(session: string | null) {
    if (session) {
      cookie.set(null, process.env.NEXT_PUBLIC_ADMIN_COOKIE!, session, {
        path: '/',
        maxAge: 60 * 60 * 7, // 7 hours
      });
    } else {
      cookie.del(null, process.env.NEXT_PUBLIC_ADMIN_COOKIE!);
    }
  }

  const handleUser = useCallback(
    (currentUser: iUserFirebase | null) => {
      if (currentUser) {
        const formattedUser = formatUser(currentUser);
        setUser(formattedUser);
        setSession(currentUser.refreshToken);
        setIsUserAdmin(true);

        return currentUser.displayName;
      }
      setUser(null);
      setSession(null);
      setIsUserAdmin(false);
      if (router.pathname.includes('/admin/dashboard')) {
        router.push('/');
      }

      return false;
    },
    [setIsUserAdmin, router],
  );

  const authenticateUser = useCallback(
    async (credentials: { password: string; email: string }) => {
      try {
        await auth
          .signInWithEmailAndPassword(
            auth.auth,
            credentials.email,
            credentials.password,
          )
          .then((res) => {
            const { user: authUser } = res;
            handleUser(authUser);
            return res;
          });
      } finally {
        // Do nothing
      }
    },
    [handleUser],
  );

  useEffect(() => {
    const unSubscribe = auth.onIdTokenChanged(auth.auth, handleUser);

    return () => unSubscribe();
  }, [handleUser]);

  const authContextValue = useMemo(
    () => ({
      authenticateUser,
      user,
    }),
    [user, authenticateUser],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
