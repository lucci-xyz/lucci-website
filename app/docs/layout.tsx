import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Container from '@/components/Container'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Container>
        <div className="py-16 lg:py-24 prose prose-neutral max-w-3xl">
          {children}
        </div>
      </Container>
      <Footer />
    </>
  )
}
