import { TextField } from '@mui/material';
import ReactInputMask from 'react-input-mask';

interface InputProps {
  inputReference?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  type?: React.HTMLInputTypeAttribute | 'multiline';
  label: string;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  onInput?: (ev: React.SyntheticEvent<HTMLInputElement>) => void;
  error?: boolean;
  rows?: number;
  mask?: string;
  style?: React.CSSProperties;
}

export const Input = ({
  type,
  placeholder,
  disabled,
  required,
  defaultValue,
  label,
  id,
  error,
  rows,
  inputReference,
  mask,
  onInput,
  style,
}: InputProps) => {
  return type === 'multiline' ? (
    <TextField
      multiline
      rows={rows}
      InputProps={{ inputRef: inputReference, id }}
      label={label}
      error={error}
      onInput={onInput}
      variant="filled"
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      defaultValue={defaultValue}
      style={style}
      required={required === undefined ? true : required}
    />
  ) : (
    <ReactInputMask
      mask={mask || ''}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      {
        ((inputProps: any) => (
          <TextField
            {...inputProps}
            required={required === undefined ? true : required}
            disabled={disabled}
            placeholder={placeholder}
            error={error}
            label={label}
            variant="filled"
            type={type}
            style={style}
            InputProps={{
              inputProps: {
                ref: inputReference,
                'aria-label': label,
                id,
                onInput,
              },
            }}
          />
        )) as unknown as React.ReactNode
      }
    </ReactInputMask>
  );
};
