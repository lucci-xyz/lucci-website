import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import DocsSidebar from '@/components/DocsSidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Container>
        <div className="py-8 lg:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
          <DocsSidebar />
          <main className="flex-1 min-w-0">
            <div className="prose prose-neutral max-w-3xl prose-headings:scroll-mt-20 prose-a:text-primary hover:prose-a:text-primary-600 prose-code:text-primary-700 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
              {children}
            </div>
          </main>
        </div>
      </Container>
      <Footer />
    </>
  )
}
