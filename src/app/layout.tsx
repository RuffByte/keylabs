import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

import Head from 'next/head';
import {
  ReactQueryDevtools,
  ReactQueryDevtoolsPanel,
} from '@tanstack/react-query-devtools';

import Transition from '@/components/common/ui/transition/Transition';
import QueryClientProvider from '@/components/providers/QueryClientProvider';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const kollektif = localFont({
  src: [
    {
      path: '../fonts/Kollektif/Kollektif.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Kollektif/Kollektif-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Kollektif/Kollektif-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../fonts/Kollektif/Kollektif-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-kollektic',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <Head>
        <meta property="og:site_name" content="KeyLabs" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="KeyLabs" />
        <meta
          property="og:description"
          content="A website where you click and aim letters"
        />
        <meta property="og:image" content="/og-image.png" />
      </Head>
      <QueryClientProvider>
        <body
          className={`${kollektif.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Transition>
            <div className="h-dvh w-dvw grid place-items-center">
              <div className="max-w-screen-desktop w-full h-full flex flex-col box-border">
                {children}
              </div>
            </div>
          </Transition>
        </body>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </html>
  );
}
