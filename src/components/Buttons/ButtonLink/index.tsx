import { useRouter } from 'next/router';
import { ContainerCSS } from './styles';

interface ButtonLinkProps {
  onClick?: () => void;
  active: boolean;
  href?: string;
  children: React.ReactNode;
}

export const ButtonLink = ({
  onClick,
  active,
  href,
  children,
}: ButtonLinkProps) => {
  const router = useRouter();
  return (
    <ContainerCSS
      type="button"
      role="link"
      isActive={active}
      className="link"
      onClick={() => {
        if (onClick) onClick();
        if (href) router.push(href);
      }}
    >
      {children}
    </ContainerCSS>
  );
};
