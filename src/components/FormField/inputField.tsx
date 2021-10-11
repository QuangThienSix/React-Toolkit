import { TextField } from '@mui/material';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export function InputField({ control, name, label, ...inputProps }: InputFieldProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      fullWidth
      size='small'
      margin="normal"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      label={label}
      variant="filled"
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
