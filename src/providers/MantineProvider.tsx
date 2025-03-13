'use client';

import { MantineProvider as MantineProviderInternal, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import React from 'react';

const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Greycliff CF, sans-serif' },
});

export function MantineProvider({ children }: { children: React.ReactNode }) {
  return <MantineProviderInternal theme={theme}>{children}</MantineProviderInternal>;
}
