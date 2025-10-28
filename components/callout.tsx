import { AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CalloutProps {
  children: ReactNode;
  type?: 'default' | 'warning';
  className?: string;
}

export function Callout({
  children,
  type = 'default',
  className,
}: CalloutProps) {
  return (
    <div
      className={cn(
        'my-6 flex items-start gap-3 rounded-lg border p-4',
        type === 'warning'
          ? 'border-yellow-500/50 bg-yellow-500/10'
          : 'border-border bg-muted',
        className
      )}
    >
      <div className="mt-0.5">
        {type === 'warning' ? (
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
        ) : (
          <Info className="h-5 w-5" />
        )}
      </div>
      <div className="flex-1 text-sm">{children}</div>
    </div>
  );
}

