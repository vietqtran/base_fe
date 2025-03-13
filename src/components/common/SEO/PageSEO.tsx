'use client';

import SEO_CONFIG from '@/lib/SEO';
import { NextSeo, NextSeoProps } from 'next-seo';

interface PageSeoProps extends Partial<NextSeoProps> {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export default function PageSeo({
  title,
  description,
  canonical,
  noindex,
  nofollow,
  ...props
}: PageSeoProps) {
  return (
    <NextSeo
      {...SEO_CONFIG}
      title={title}
      description={description || SEO_CONFIG.description}
      canonical={canonical}
      noindex={noindex}
      nofollow={nofollow}
      {...props}
    />
  );
}
