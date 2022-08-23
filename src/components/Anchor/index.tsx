import Link, { type LinkProps } from 'next/link';

interface AnchorProps extends LinkProps {
  children: React.ReactNode;
  ariaLabel: string;
}

export const Anchor = ({ children, ariaLabel, ...rest }: AnchorProps) => {
  return (
    <Link {...rest} passHref>
      <a href="replace" target="__blank" aria-label={ariaLabel}>
        {children}
      </a>
    </Link>
  );
};
