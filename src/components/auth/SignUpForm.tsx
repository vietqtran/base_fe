'use client';

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
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Github, Lock, Mail, User, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const signupSchema = z
  .object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof signupSchema>;

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // router.push('/')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to create account. Please try again.');
      } else {
        setError('Failed to create account. Please try again.' + values);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSocialSignup(provider: string) {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || `Failed to signup with ${provider}. Please try again.`);
      } else {
        setError(`Failed to signup with ${provider}. Please try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (!mounted) return null;

  return (
    <Card className='w-full bg-white/95 shadow-xl transition-all duration-300 hover:shadow-2xl'>
      <CardHeader className='space-y-1'>
        <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100'>
          <UserPlus className='h-6 w-6 text-violet-600' />
        </div>
        <CardTitle className='text-center text-2xl'>Create an account</CardTitle>
        <CardDescription className='text-center'>Enter your details to sign up</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant='destructive' className='mb-4'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <User className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
                        <Input className='pl-9' placeholder='John' {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <User className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
                        <Input className='pl-9' placeholder='Doe' {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
                      <Input className='pl-9' placeholder='name@example.com' {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
                      <Input
                        className='pl-9'
                        type='password'
                        placeholder='Create a strong password'
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
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
                      <Input
                        className='pl-9'
                        type='password'
                        placeholder='Confirm your password'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className='text-sm text-gray-500'>
              Password must be at least 8 characters and include uppercase, lowercase, and numbers
            </p>

            <Button
              type='submit'
              className='w-full bg-violet-600 hover:bg-violet-700'
              disabled={isLoading}
            >
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </Form>

        <div className='my-6'>
          <Separator>Or continue with</Separator>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <Button
            variant='outline'
            onClick={() => handleSocialSignup('google')}
            disabled={isLoading}
          >
            <svg
              className='mr-2 h-4 w-4'
              aria-hidden='true'
              focusable='false'
              data-prefix='fab'
              data-icon='google'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 488 512'
            >
              <path
                fill='currentColor'
                d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
              ></path>
            </svg>
            Google
          </Button>
          <Button
            variant='outline'
            onClick={() => handleSocialSignup('github')}
            disabled={isLoading}
          >
            <Github className='mr-2 h-4 w-4' />
            GitHub
          </Button>
        </div>

        <p className='mt-6 text-center text-sm text-gray-500'>
          Already have an account?{' '}
          <a href='/auth/sign-in' className='font-medium text-violet-600 hover:text-violet-500'>
            Sign in
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
