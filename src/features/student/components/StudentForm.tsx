import { Student } from 'models/student';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Box from '@mui/system/Box';
import { InputField, RadioGroupField, SelectField } from 'components/FormField';
import { Alert, Button, CircularProgress } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from 'app/hooks';
import { selectCityOptins } from 'features/city/citySlice';

export interface StudentFormProps {
  initialValue?: Student;
  onSubmit?: (formValue: Student) => void;
}

export default function StudentForm({ initialValue, onSubmit }: StudentFormProps) {
  const [error, setError] = useState<string>('');

  const schema = yup.object().shape({
    name: yup
      .string()
      .required()
      .test('two-word', 'Please enter at least two words', (value) => {
        if (!value) return true;
        const parts = value.split(' ') || [];
        return parts.filter((x) => !!x).length >= 2;
      }),
    age: yup
      .number()
      .min(18, 'Min is 18')
      .max(60, 'Max is 18')
      .positive('Please enter a positive number.')
      .integer('Please enter an integer.')
      .required('Please enter age.')
      .typeError('Please enter a valid number'),
    mark: yup
      .number()
      .max(10, 'Max 10')
      .min(0, 'Min 0')
      .typeError('Please enter a valid number')
      .required('Please enter mark.'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male or female')
      .required('Please select gender.'),
    city: yup.string().required('Please select city'),
  });

  const handleFormSubmit = async (formValue: Student) => {
    try {
      setError('');
      await onSubmit?.(formValue);
    } catch (error) {
      // console.log('Failed to Add/update student', error);
      setError(error.message);
    }
  };
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const cityOptions = useAppSelector(selectCityOptins);

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />

        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField options={cityOptions} name="city" control={control} label="City" />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}&nbsp;Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
