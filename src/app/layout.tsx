import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const appName = 'Universal Image Toolkit';
const description = 'Fast, Simple & Safe Image Tools. All processing is done client-side, ensuring your privacy. Compress, resize, convert, crop, and more!';

export const metadata: Metadata = {
  title: {
    default: `${appName} - ${description}`,
    template: `%s | ${appName}`,
  },
  description: description,
  openGraph: {
    title: appName,
    description: description,
    type: 'website',
    locale: 'en_US',
    url: 'https://universalkitt.web.app', // Placeholder URL
    siteName: appName,
  },
  applicationName: appName,
  appleWebApp: {
    capable: true,
    title: appName,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: appName,
  description: description,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
  offers: {
    '@type': 'Offer',
    price: '0',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <div className="relative flex min-h-dvh flex-col bg-background">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
