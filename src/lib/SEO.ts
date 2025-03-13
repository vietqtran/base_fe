import { DefaultSeoProps } from 'next-seo';

const SEO_CONFIG: DefaultSeoProps = {
  titleTemplate: '%s | Your Site Name',
  defaultTitle: 'Your Site Name',
  description: 'Your site description goes here',
  canonical: 'https://www.yourdomain.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.yourdomain.com',
    siteName: 'Your Site Name',
    images: [
      {
        url: 'https://www.yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Og Image Alt',
      },
    ],
  },
  twitter: {
    handle: '@yourhandle',
    site: '@yoursite',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
};

export default SEO_CONFIG;
