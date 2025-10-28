'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function Marquee({ children, className, speed = 20 }: MarqueeProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="flex gap-4"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {children}
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

