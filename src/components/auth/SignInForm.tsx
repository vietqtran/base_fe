'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { emailValidation, passwordValidation } from '@/constants/validate';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const signInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const formValues = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const validationResult = signInSchema.safeParse(formValues);

    if (!validationResult.success) {
      const formattedErrors = {
        email: '',
        password: '',
      };

      validationResult.error.errors.forEach((error) => {
        const path = error.path[0] as keyof SignInFormValues;
        formattedErrors[path] = error.message;
      });

      setErrors(formattedErrors);
      setIsLoading(false);
      return;
    }

    const result = { success: true, errors: {}, message: '' };

    if (result.success) {
      toast('Signed in successfully!');
      router.push('/dashboard');
    } else {
      setErrors(result.errors || {});
      if (result.message) {
        toast('An error occurred. Please try again.');
      }
    }

    setIsLoading(false);
  }

  return (
    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
      <div className='space-y-2'>
        <Label htmlFor='email' className='block text-sm font-medium text-[#313957]'>
          Email
        </Label>
        <Input
          autoFocus
          id='email'
          name='email'
          type='email'
          placeholder='example@email.com'
          className={`w-full rounded-md border ${
            errors.email ? 'border-red-500' : 'border-[#d4d7e3]'
          } bg-[#f7fbff] px-3 py-2 text-[#313957]`}
        />
        {errors.email && <p className='mt-1 text-xs text-red-500'>{errors.email}</p>}
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <Label htmlFor='password' className='block text-sm font-medium text-[#313957]'>
            Password
          </Label>
          <Link href='/auth/forgot' className='text-sm text-[#1e4ae9] hover:underline'>
            Forgot Password?
          </Link>
        </div>
        <Input
          id='password'
          name='password'
          type='password'
          placeholder='••••••••'
          className={`w-full rounded-md border ${
            errors.password ? 'border-red-500' : 'border-[#d4d7e3]'
          } bg-[#f7fbff] px-3 py-2 text-[#313957]`}
        />
        {errors.password && <p className='mt-1 text-xs text-red-500'>{errors.password}</p>}
      </div>

      {errors.general && (
        <div className='rounded-md bg-red-50 p-3'>
          <p className='text-sm text-red-500'>{errors.general}</p>
        </div>
      )}

      <Button
        type='submit'
        disabled={isLoading}
        className='w-full cursor-pointer rounded-md bg-[#162d3a] py-2.5 text-white hover:bg-[#122b31] focus:outline-none focus:ring-2 focus:ring-[#294957] focus:ring-offset-2'
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-[#d4d7e3]'></div>
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='bg-white px-4 text-[#8897ad]'>Or</span>
        </div>
      </div>

      <div className='space-y-3'>
        <button
          type='button'
          className='flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-[#d4d7e3] bg-[#f7fbff] px-4 py-2 text-sm font-medium text-[#313957] hover:bg-[#f3f9fa]'
          onClick={() => {
            toast('Google sign-in would be triggered here.');
          }}
        >
          <svg width='20' height='20' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
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
          Sign in with Google
        </button>
        <button
          type='button'
          className='flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-[#d4d7e3] bg-[#f7fbff] px-4 py-2 text-sm font-medium text-[#313957] hover:bg-[#f3f9fa]'
          onClick={() => {
            toast('Facebook sign-in would be triggered here.');
          }}
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='#1877F2'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
          </svg>
          Sign in with Facebook
        </button>
      </div>
    </form>
  );
}
