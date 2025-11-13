import { SOCIAL_LINKS } from '@/lib/constants/social'
import { COLORS } from '@/lib/constants/theme'

/**
 * Social media links component
 * Displays social media icons with gradient line separator
 */
export default function Socials() {

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {/* Social Icons */}
      <div className="flex gap-8 items-center">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            style={{ color: COLORS.primary }}
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
      
      {/* Gradient Line */}
      <div className="w-full max-w-2xl">
        <div 
          className="h-1 rounded-full" 
          style={{
            background: 'linear-gradient(to right, #1F807B, #3D9D98, #63BBB6, #9DEBE7, #CCFFF8)'
          }}
        />
      </div>
    </div>
  )
}
