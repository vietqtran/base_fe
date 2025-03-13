'use client';

import { useDevice } from '@/hooks';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Lock, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const signinSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

type FormValues = z.infer<typeof signinSchema>;

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { isMobile } = useDevice();

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: FormValues) {
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

  if (!mounted) return null;

  return (
    <div className='w-full max-w-md mx-auto'>
      <Card
        className={cn(
          'w-full bg-white/95 shadow-xl transition-all duration-300 hover:shadow-2xl',
          isMobile ? 'p-4' : 'p-6'
        )}
      >
        <CardHeader className='space-y-1 text-center'>
          <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100'>
            <Mail className='h-6 w-6 text-violet-600' />
          </div>
          <CardTitle className='text-2xl font-semibold'>Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant='destructive' className='mb-6'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                        <Input
                          placeholder='name@example.com'
                          className='pl-10'
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between'>
                      <FormLabel>Password</FormLabel>
                      <Button
                        variant='link'
                        size='sm'
                        className='px-0 font-normal text-violet-600 hover:text-violet-700'
                        disabled={isLoading}
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                        <Input
                          type='password'
                          placeholder='Your password'
                          className='pl-10'
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='w-full bg-violet-600 hover:bg-violet-700 text-white'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></span>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
          </Form>

          <div className='relative my-6'>
            <Separator />
            <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-muted-foreground'>
              Or continue with
            </span>
          </div>

          <div className='space-y-3'>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => handleSocialSignIn('google')}
              disabled={isLoading}
            >
              <svg className='mr-2 h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  fill='#4285F4'
                />
                <path
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  fill='#34A853'
                />
                <path
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  fill='#FBBC05'
                />
                <path
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  fill='#EA4335'
                />
              </svg>
              Continue with Google
            </Button>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => handleSocialSignIn('github')}
              disabled={isLoading}
            >
              <svg className='mr-2 h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
              </svg>
              Continue with GitHub
            </Button>
          </div>

          <p className='text-sm text-center text-gray-500 mt-6'>
            Don&apos;t have an account?{' '}
            <Link
              href='/auth/sign-up'
              className='text-violet-600 hover:text-violet-700 transition-colors duration-300'
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
