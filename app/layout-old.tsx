import React from 'react';
import type { Metadata, Viewport } from 'next';
// import { Plus_Jakarta_Sans } from 'next/font/google';
import "@/app/globals.css"
import { Toaster } from 'sonner';

// const plusJakarta = Plus_Jakarta_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700', '800'],
//   variable: '--font-plus-jakarta',
//   display: 'swap',
// });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'ZengwaConnect — Transforming Lives Through Faith & Education',
  description:
    'Support Zengwa Christian Education Centre through donations, child sponsorship, and ministry partnerships. 100% of funds go directly to transforming communities in Africa.',
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // <html lang="en" className={plusJakarta.variable}>
    //   <body className={plusJakarta.className}>
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--card)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
            },
          }}
        />

        </body>
    </html>
  );
}
