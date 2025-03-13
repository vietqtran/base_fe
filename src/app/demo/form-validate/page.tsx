'use client';

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Group,
  NumberInput,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import { z } from 'zod';
import '@mantine/core/styles.css';

const formSchema = z
  .object({
    name: z.string().min(2, { message: 'Name should have at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email' }),
    age: z
      .number()
      .min(18, { message: 'You must be at least 18' })
      .max(100, { message: 'Age cannot exceed 100' }),
    occupation: z.string().min(1, { message: 'Please select an occupation' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Password must include an uppercase letter' })
      .regex(/[0-9]/, { message: 'Password must include a number' }),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

export default function FormDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      email: '',
      age: 18,
      occupation: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
    validate: zodResolver(formSchema),
  });

  const handleSubmit = (values: FormValues) => {
    setFormData(values);
    setSubmitted(true);
  };

  return (
    <Box p='xl' maw={500} mx='auto'>
      <Title order={1} mb='md'>
        Registration Form
      </Title>
      <Text color='dimmed' mb='xl'>
        Please fill in the form below to create your account
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={'md'}>
          <TextInput
            withAsterisk
            label='Full Name'
            placeholder='John Doe'
            {...form.getInputProps('name')}
          />

          <TextInput
            withAsterisk
            label='Email'
            placeholder='your@email.com'
            {...form.getInputProps('email')}
          />

          <NumberInput
            withAsterisk
            label='Age'
            placeholder='Your age'
            min={1}
            max={100}
            {...form.getInputProps('age')}
          />

          <Select
            withAsterisk
            label='Occupation'
            placeholder='Select your occupation'
            data={[
              { value: 'developer', label: 'Developer' },
              { value: 'designer', label: 'Designer' },
              { value: 'manager', label: 'Manager' },
              { value: 'student', label: 'Student' },
              { value: 'other', label: 'Other' },
            ]}
            {...form.getInputProps('occupation')}
          />

          <PasswordInput
            withAsterisk
            label='Password'
            placeholder='Password'
            description='Must contain at least 8 characters, one uppercase letter, and one number'
            {...form.getInputProps('password')}
          />

          <PasswordInput
            withAsterisk
            label='Confirm Password'
            placeholder='Confirm your password'
            {...form.getInputProps('confirmPassword')}
          />

          <Checkbox
            label='I accept the terms and conditions'
            {...form.getInputProps('termsAccepted', { type: 'checkbox' })}
          />

          <Group justify='flex-end' mt='md'>
            <Button type='submit'>Submit</Button>
          </Group>
        </Stack>
      </form>

      {submitted && formData && (
        <Alert title='Form Submitted Successfully!' color='green' mt='xl'>
          <Text>Thank you, {formData.name}!</Text>
          <Text>We&apos;ll send a confirmation to {formData.email}</Text>
        </Alert>
      )}
    </Box>
  );
}
