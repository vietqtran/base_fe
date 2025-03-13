'use client';

import {
  MantineColorsTuple,
  MantineProvider as MantineProviderInternal,
  createTheme,
} from '@mantine/core';
import '@mantine/core/styles.css';
import React from 'react';

const myColor: MantineColorsTuple = [
  '#edf2fd',
  '#d7e1f5',
  '#aac0ed',
  '#7b9de7',
  '#5580e2',
  '#3f6ddf',
  '#3364df',
  '#2754c6',
  '#1f4ab1',
  '#11409d',
];

const theme = createTheme({
  fontFamily: 'Roboto, sans-serif',
  colors: {
    myColor,
  },
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});

export function MantineProvider({ children }: { children: React.ReactNode }) {
  return <MantineProviderInternal theme={theme}>{children}</MantineProviderInternal>;
}
