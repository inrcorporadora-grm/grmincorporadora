import { useEffect } from 'react';
import { useLayoutContext } from '@contexts/Layout/useLayoutContext';

import { Link } from './Link';
import { ContainerCSS } from './styles';

interface NavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Navigation = ({ isOpen, setIsOpen }: NavigationProps) => {
  const { currWidth, isUserAdmin } = useLayoutContext();
  function closeNavigation() {
    setIsOpen(false);
  }
  useEffect(() => {
    if (!isOpen) {
      const firstTrigger = document.getElementById('hamburger');
      firstTrigger?.focus();
    }
  }, [isOpen]);
  useEffect(() => {
    if (currWidth > 1024) setIsOpen(false);
  }, [currWidth, setIsOpen]);
  useEffect(() => {
    document.addEventListener('scroll', () => setIsOpen(false));
  }, [setIsOpen]);

  return (
    <>
      <ContainerCSS className="navigation" id="navigation">
        <nav>
          <Link onClick={() => closeNavigation()} href="/">
            home
          </Link>
          <Link onClick={() => closeNavigation()} href="/about">
            quem somos
          </Link>
          <Link onClick={() => closeNavigation()} href="/enterprises">
            empreendimentos
          </Link>
          <Link onClick={() => closeNavigation()} href="/land">
            ofereça seu terreno
          </Link>
          <Link onClick={() => closeNavigation()} href="/contact">
            contato
          </Link>

          {isUserAdmin && (
            <Link onClick={() => closeNavigation()} href="/admin/dashboard">
              Dashboard
            </Link>
          )}
        </nav>
      </ContainerCSS>
      {isOpen && (
        <span
          aria-hidden
          onClick={() => closeNavigation()}
          style={{
            display: 'block',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '1',
          }}
        />
      )}
    </>
  );
};
