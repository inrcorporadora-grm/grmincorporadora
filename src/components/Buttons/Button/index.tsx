// import { useRef } from 'react';
import { SxProps, Theme } from '@mui/material';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import ButtonMUI from '@mui/material/Button';

interface ButtonProps {
  loading?: boolean;
  styles?: SxProps<Theme>;
  icon?: React.ReactNode;
  type?: 'submit' | 'button';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export const Button = ({
  type,
  icon,
  href,
  styles,
  loading,
  onClick,
  children,
}: ButtonProps) => {
  const router = useRouter();

  return loading !== undefined ? (
    <LoadingButton
      size="large"
      loading={loading}
      variant="contained"
      role={href ? 'link' : 'button'}
      endIcon={icon}
      type={type}
      onClick={() => {
        if (href) router.push(href);
        if (onClick) onClick();
      }}
      sx={{
        ...styles,
        width: 'fit-content',
        borderRadius: '0.6rem',
        backgroundColor: 'rgb(var(--color-background600))',
        ':hover': {
          backgroundColor: 'rgb(var(--color-primary))',
        },
      }}
    >
      {children}
    </LoadingButton>
  ) : (
    <ButtonMUI
      size="large"
      variant="contained"
      role={href ? 'link' : 'button'}
      endIcon={icon}
      type={type}
      onClick={() => {
        if (href) router.push(href);
        if (onClick) onClick();
      }}
      sx={{
        ...styles,
        width: 'fit-content',
        borderRadius: '0.6rem',
        backgroundColor: 'rgb(var(--color-background600))',
        ':hover': {
          backgroundColor: 'rgb(var(--color-primary))',
        },
      }}
    >
      {children}
    </ButtonMUI>
  );
};
