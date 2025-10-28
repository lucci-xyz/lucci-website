import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-3xl font-bold">Page Not Found</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          This page doesn't exist. Maybe it never did. Maybe it's in a
          half-finished branch somewhere.
        </p>
        <Button asChild size="lg">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </Section>
  );
}

