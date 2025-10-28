import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="container px-6 py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Image
              src="/lucci.svg"
              alt="Lucci Labs"
              width={90}
              height={24}
              className="mb-4 dark:invert"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Open source experiments in Web3, DeFi, and cryptography.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/projects"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Research
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Social
            </h3>
            <div className="flex gap-4">
              <Link
                href="https://github.com/LucciCapital"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com/luccilabs"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Lucci Labs. Open source and
            experimental.
          </p>
        </div>
      </div>
    </footer>
  );
}
