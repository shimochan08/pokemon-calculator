import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/foundations/globals.css';
import '@/styles/layouts/app-layout.css';
import '@/styles/pages/home.css';
import '@/styles/pages/auth.css';
import '@/styles/components/dashboard.css';
import '@/styles/components/dialog.css';
import '@/styles/components/add-panel.css';
import '@/styles/components/organisms.css';
import '@/styles/components/forms.css';
import AppLayout from '@/components/layouts/AppLayout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pokémon Dashboard',
  description: 'A calculator for Pokémon stats and battles',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
