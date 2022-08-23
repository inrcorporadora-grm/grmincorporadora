/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from 'react';
import { useLayoutContext } from '@contexts/Layout/useLayoutContext';
import { focusTrapOnKeyboardEvent } from '@utils/focusTrapOnKeyboardEvent';

import { Logo } from '@components/Logo';
import { HamburgerMenuIcon } from '@stylesComponents/icons/HamburgerMenu';
import { Navigation } from './Navigation';

import { ContainerCSS } from './styles';

export const Header = () => {
  const { isSpecialPage, currWidth } = useLayoutContext();
  const [isOpen, setIsOpen] = useState(false);
  const menuCheckId = 'menu-check';

  return (
    <ContainerCSS isSpecialPage={isSpecialPage}>
      <button
        type="button"
        ref={(element) => {
          if (element) element.focus();
        }}
        onClick={() => (document.querySelector('#main') as HTMLElement).focus()}
        style={{
          position: 'absolute',
          opacity: '0',
        }}
      >
        pular para o conteúdo principal
      </button>
      <input
        type="checkbox"
        id={menuCheckId}
        style={{ display: 'none' }}
        checked={isOpen}
        onChange={() => setIsOpen(isOpen)}
      />
      <div className="mx-w">
        <Logo />
        <div
          role="menu"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
            return isOpen && focusTrapOnKeyboardEvent(e);
          }}
        >
          <label
            htmlFor={menuCheckId}
            role="button"
            tabIndex={0}
            id="hamburger"
            aria-controls="navigation"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              cursor: 'pointer',
              display: currWidth > 1024 ? 'none' : 'block',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <HamburgerMenuIcon />
          </label>
          <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </ContainerCSS>
  );
};
