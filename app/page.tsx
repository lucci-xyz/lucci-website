import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Research from '@/components/Research'
import Projects from '@/components/Projects'
import Partners from '@/components/Partners'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-neutral-950">
      <Header />
      <Hero />
      <Research />
      <Projects />
      <Partners />
      <Newsletter />
      <Footer />
    </main>
  )
}
