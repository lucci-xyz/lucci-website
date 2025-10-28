import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Lucci Labs: our philosophy, approach to R&D, and commitment to building open-source Web3 infrastructure.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

