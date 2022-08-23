import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SelectMUI, { SelectChangeEvent } from '@mui/material/Select';

interface SelectProps {
  defaultValue: string;
  inputLabel: string;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  menuItems: {
    key: string;
    label: string;
  }[];
}

export const Select = ({
  onChange,
  menuItems,
  inputLabel,
  defaultValue,
}: SelectProps) => {
  return (
    <FormControl variant="filled" sx={{ width: '50%', m: 1, marginLeft: 0 }}>
      <InputLabel>{inputLabel}</InputLabel>
      <SelectMUI value={defaultValue} onChange={onChange}>
        {menuItems.map(({ key, label }) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </SelectMUI>
    </FormControl>
  );
};
