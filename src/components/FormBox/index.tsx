import { Box, type SxProps, type Theme } from '@mui/material';

interface FormBoxProps {
  children: React.ReactNode;
  onSubmit: () => void;
  autoComplete?: boolean;
  style?: SxProps<Theme>;
}

export const FormBox = ({
  children,
  autoComplete,
  style,
  onSubmit,
}: FormBoxProps) => {
  return (
    <Box
      component="form"
      autoComplete={autoComplete ? undefined : 'off'}
      onSubmit={(ev: any) => {
        onSubmit();
        ev.preventDefault();
      }}
      sx={{
        '& .MuiTextField-root': { m: '0.5rem 0', width: '100%' },
        '& > section .MuiTextField-root': { m: '0.5rem', width: '100%' },
        '& > section .MuiTextField-root:first-of-type': { marginLeft: '0' },
        '& > section .MuiTextField-root:last-child': { marginRight: '0' },
        ...style,
      }}
    >
      {children}
    </Box>
  );
};
