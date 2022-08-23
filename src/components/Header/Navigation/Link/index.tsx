import type { UrlObject } from 'url';

import LinkNextJS from 'next/link';
import { useRouter } from 'next/router';
import { ContainerCSS } from './styles';

interface LinkProps {
  href: string | UrlObject;
  onClick: () => void;
  children: React.ReactNode;
}

export const Link = ({ href, onClick, children }: LinkProps) => {
  const router = useRouter();
  const { pathname } = router;
  const isHrefString = typeof href === 'string';

  return (
    <ContainerCSS
      isActive={
        (isHrefString && pathname === href) ||
        (!isHrefString && href.pathname === pathname)
      }
      onClick={onClick}
    >
      <LinkNextJS href={href} as={href}>
        {children}
      </LinkNextJS>
    </ContainerCSS>
  );
};
