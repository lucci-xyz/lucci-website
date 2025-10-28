import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Open-source experiments in Web3 infrastructure. Smart contracts, developer tooling, and cryptographic primitives.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

