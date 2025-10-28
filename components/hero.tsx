import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-32 pt-20 md:pb-40 md:pt-32">
      {/* Clean white background */}
      <div className="absolute inset-0 -z-10 bg-white dark:bg-background" />
      
      <div className="container px-6">
        {/* Announcement banner - Aave style */}
        <div className="mb-12 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm dark:bg-gray-800">
          <span className="text-gray-700 dark:text-gray-300">Web3 / Crypto / DeFi R&D</span>
        </div>
        
        {/* Main hero - LEFT ALIGNED like Aave */}
        <div className="max-w-4xl">
          <h1 className="mb-8 text-5xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl">
            Build, break, and experiment with Web3.
          </h1>
          
          {/* Single CTA */}
          <Button asChild size="lg" className="h-14 rounded-full px-8 text-base font-medium">
            <Link href="/projects">
              Explore Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          {/* Stat with colored dot - Aave style */}
          <div className="mt-16 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-purple-500" />
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Open-source experiments in smart contracts, zk-proofs, and tokenomics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
