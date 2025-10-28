import Link from 'next/link'
import { Github, Twitter, MessageCircle, FileText, Book, Mail } from 'lucide-react'

const footerLinks = {
  resources: [
    { name: 'Blog', href: '#blog' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Research Papers', href: '/research' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'FAQ', href: '/faq' },
  ],
  developers: [
    { name: 'GitHub', href: 'https://github.com/luccilabs' },
    { name: 'API Reference', href: '/api' },
    { name: 'SDK', href: '/sdk' },
    { name: 'Smart Contracts', href: '/contracts' },
    { name: 'Bug Bounty', href: '/bug-bounty' },
  ],
  company: [
    { name: 'About', href: '#about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/luccilabs', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/luccilabs', label: 'Twitter' },
  { icon: MessageCircle, href: 'https://discord.gg/luccilabs', label: 'Discord' },
  { icon: Mail, href: 'mailto:hello@luccilabs.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-neutral-950/50 backdrop-blur-xl">
      {/* Main Footer */}
      <div className="container-width section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 group mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-lucci-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-lucci-400 to-lucci-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
              </div>
              <span className="text-xl font-semibold">Lucci Labs</span>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-sm">
              An experimental, open-source playground where innovation moves faster than perfection. 
              Building the future of Web3, one protocol at a time.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Developers</h3>
            <ul className="space-y-3">
              {footerLinks.developers.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-width section-padding py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-neutral-500">
              © 2024 Lucci Labs. All rights reserved.
            </p>
            <p className="text-sm text-neutral-500">
              Built with ❤️ in San Francisco & New York City
            </p>
          </div>
        </div>
      </div>

      {/* Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 mesh-gradient opacity-50" />
    </footer>
  )
}
