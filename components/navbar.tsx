'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Research', href: '/research' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80">
      <nav className="container flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex">
          <Link href="/" className="flex items-center">
            <Image
              src="/lucci.svg"
              alt="Lucci Labs"
              width={100}
              height={26}
              className="dark:invert"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8">
            {navigation.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white',
                  pathname === item.href
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="text-gray-600 dark:text-gray-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:hidden">
          <div className="container space-y-1 px-6 py-4">
            {navigation.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800',
                  pathname === item.href
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
