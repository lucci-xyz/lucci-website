import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Research notes and design explorations on Web3, DeFi, zero-knowledge proofs, MEV, and tokenomics.',
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

