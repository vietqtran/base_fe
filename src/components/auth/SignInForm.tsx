'use client';

import { useDevice } from '@/hooks';
import {
  Alert,
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  Transition,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconAlertCircle, IconLock, IconMail } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import * as z from 'zod';
import { GithubButton, GoogleButton } from '../common/Button/Social';

const signinSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { isMobile } = useDevice();

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm({
    validate: zodResolver(signinSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: typeof form.values) {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // router.push('/')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Invalid email or password. Please try again.');
      } else {
        setError('Invalid email or password. Please try again.' + values);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSocialSignIn(provider: string) {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // router.push('/')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || `Failed to sign in with ${provider}. Please try again.`);
      } else {
        setError(`Failed to sign in with ${provider}. Please try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Transition mounted={mounted} transition='fade' duration={400} timingFunction='ease'>
      {(styles) => (
        <div style={styles}>
          <Paper
            radius='lg'
            p={isMobile ? 'md' : 'xl'}
            withBorder
            className='w-full bg-white/95 shadow-xl transition-all duration-300 hover:shadow-2xl'
          >
            <div className='mb-6 text-center'>
              <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100'>
                <IconMail className='h-6 w-6 text-violet-600' />
              </div>
              <Title order={2} className='text-center mb-1 text-gray-800'>
                Welcome back
              </Title>
              <Text c='dimmed' size='sm' ta='center'>
                Enter your credentials to access your account
              </Text>
            </div>

            {error && (
              <Transition
                mounted={!!error}
                transition='slide-down'
                duration={300}
                timingFunction='ease'
              >
                {(styles) => (
                  <Alert
                    style={styles}
                    icon={<IconAlertCircle size={16} />}
                    title='Error'
                    color='red'
                    className='mb-4'
                    variant='light'
                  >
                    {error}
                  </Alert>
                )}
              </Transition>
            )}

            <form onSubmit={form.onSubmit(onSubmit)}>
              <Stack>
                <TextInput
                  label='Email'
                  placeholder='name@example.com'
                  leftSection={<IconMail size={16} />}
                  {...form.getInputProps('email')}
                  disabled={isLoading}
                  className='transition-all duration-200'
                  styles={{
                    input: {
                      transition: 'all 0.2s ease',
                      '&:focus': {
                        borderColor: 'var(--mantine-color-violet-6)',
                        boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.25)',
                      },
                    },
                  }}
                />

                <div>
                  <Group justify='space-between' mb={5}>
                    <Text component='label' htmlFor='password' size='sm' fw={500}>
                      Password
                    </Text>
                    <Button
                      variant='transparent'
                      className='p-0 h-auto text-sm text-violet-600 hover:text-violet-700 transition-colors duration-300'
                      disabled={isLoading}
                    >
                      Forgot password?
                    </Button>
                  </Group>
                  <PasswordInput
                    id='password'
                    placeholder='Your password'
                    leftSection={<IconLock size={16} />}
                    {...form.getInputProps('password')}
                    disabled={isLoading}
                    className='transition-all duration-200'
                    styles={{
                      input: {
                        transition: 'all 0.2s ease',
                        '&:focus': {
                          borderColor: 'var(--mantine-color-violet-6)',
                          boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.25)',
                        },
                      },
                    }}
                  />
                </div>

                <Button
                  type='submit'
                  fullWidth
                  loading={isLoading}
                  className='bg-violet-600 hover:bg-violet-700 transition-colors duration-300 mt-4'
                  loaderProps={{ color: 'white' }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>

            <Divider label='Or continue with' labelPosition='center' my='lg' />

            <Group grow mb='md' mt='md'>
              <GoogleButton onClick={() => handleSocialSignIn('google')} />
              <GithubButton onClick={() => handleSocialSignIn('github')} />
            </Group>

            <Text ta='center' size='sm' className='text-gray-500 mt-6'>
              Don&apos;t have an account?{' '}
              <Anchor href='/auth/sign-up' className='transition-colors duration-300'>
                Sign up
              </Anchor>
            </Text>
          </Paper>
        </div>
      )}
    </Transition>
  );
}
