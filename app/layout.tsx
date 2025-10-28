import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Lucci Labs — Web3 / Crypto / DeFi R&D',
    template: '%s | Lucci Labs',
  },
  description:
    'A playground for Web3 / Crypto / DeFi R&D. Experimental smart contracts, zk-proofs, and tokenomics models.',
  keywords: [
    'Web3',
    'DeFi',
    'Crypto',
    'Smart Contracts',
    'Zero Knowledge',
    'Tokenomics',
    'MEV',
    'Blockchain Research',
  ],
  authors: [{ name: 'Lucci Labs' }],
  creator: 'Lucci Labs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://luccilabs.com',
    title: 'Lucci Labs — Web3 / Crypto / DeFi R&D',
    description:
      'A playground for Web3 / Crypto / DeFi R&D. Experimental smart contracts, zk-proofs, and tokenomics models.',
    siteName: 'Lucci Labs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucci Labs — Web3 / Crypto / DeFi R&D',
    description:
      'A playground for Web3 / Crypto / DeFi R&D. Experimental smart contracts, zk-proofs, and tokenomics models.',
    creator: '@luccilabs',
  },
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
