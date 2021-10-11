import { InputLabel, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  label?: string;
  value: string | number;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}

export function SelectField({ control, name, label, disabled, options }: SelectFieldProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useController({
    name,
    control,
  });
  return (
    <FormControl
      variant="outlined"
      size="small"
      fullWidth
      disabled={disabled}
      margin="normal"
      error={invalid}
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
