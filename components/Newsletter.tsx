'use client'

import { useState } from 'react'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubscribed(true)
    setIsLoading(false)
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lucci-500/10 to-transparent" />
      </div>

      <div className="container-width section-padding">
        <div className="glass-effect rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-lucci-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-lucci-400 to-lucci-600 rounded-2xl mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay on the Cutting Edge
            </h2>
            <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
              Get weekly insights on our latest research, protocol updates, and exclusive alpha from the Lucci Labs team.
            </p>

            {/* Form */}
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="satoshi@example.com"
                    className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-lucci-400 transition-colors placeholder:text-neutral-600"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      'px-8 py-4 bg-gradient-to-r from-lucci-500 to-lucci-600 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2',
                      isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-lucci-600 hover:to-lucci-700'
                    )}
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-neutral-500 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="glass-effect rounded-xl p-6 flex items-center space-x-4">
                  <CheckCircle className="w-8 h-8 text-accent-lime flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-medium">Welcome to Lucci Labs!</p>
                    <p className="text-sm text-neutral-400">
                      Check your inbox for a confirmation email.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
              <div>
                <p className="text-2xl font-bold gradient-text">10k+</p>
                <p className="text-sm text-neutral-500">Subscribers</p>
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text">Weekly</p>
                <p className="text-sm text-neutral-500">Updates</p>
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text">100%</p>
                <p className="text-sm text-neutral-500">Open Source</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
