import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import Section from '@/components/Section'
import ProductCard from '@/components/ProductCard'
import products from '@/data/products.json'

export const metadata = { title: 'Products — Lucci Labs' }

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <Container>
        <Section>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink">Products</h1>
          <p className="mt-3 text-ink/70">Open‑source, deliberately minimal, occasionally chaotic.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <ProductCard key={p.name} {...p} />
            ))}
          </div>
        </Section>
      </Container>
      <Footer />
    </>
  )
}
