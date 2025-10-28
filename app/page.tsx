import { Hero } from '@/components/hero';
import { RainbowBar } from '@/components/rainbow-bar';
import { Section } from '@/components/section';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ArrowRight, Lock, Zap, Coins } from 'lucide-react';
import { getProjects } from '@/lib/projects';
import { getResearchPosts } from '@/lib/mdx';
import { formatDistanceToNow } from 'date-fns';

export default function Home() {
  const projects = getProjects().slice(0, 3);
  const researchPosts = getResearchPosts().slice(0, 3);

  return (
    <>
      <Hero />
      
      {/* Rainbow bar - Aave style */}
      <RainbowBar />

      {/* What We Do Section - Aave style with tabs */}
      <Section className="bg-white dark:bg-background">
        <div className="max-w-6xl">
          <h2 className="mb-12 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            Meet Lucci
          </h2>
          
          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="mb-8 border-b border-gray-200 bg-transparent p-0 dark:border-gray-800">
              <TabsTrigger 
                value="tools"
                className="rounded-none border-b-2 border-transparent px-0 pb-4 pr-8 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <span className="text-lg font-medium">Tools</span>
              </TabsTrigger>
              <TabsTrigger 
                value="research"
                className="rounded-none border-b-2 border-transparent px-0 pb-4 pr-8 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <span className="text-lg font-medium text-gray-500 dark:text-gray-400">Research</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tools" className="mt-0">
              <p className="mb-12 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                Build with open-source tools for smart contracts, zk-proofs, and DeFi protocols.
              </p>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                  <Zap className="mb-4 h-8 w-8 text-blue-500" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Open-Source</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Developer tooling and smart contract libraries. Built in public.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                  <Lock className="mb-4 h-8 w-8 text-teal-500" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">zk & Crypto</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Zero-knowledge primitives and privacy-preserving protocols.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                  <Coins className="mb-4 h-8 w-8 text-orange-500" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Token Design</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Experimental tokenomics models and mechanism design.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="research" className="mt-0">
              <p className="mb-12 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                Research notes on MEV, risk modeling, and protocol design. Unpolished by design.
              </p>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Stat line - Aave style */}
        <div className="mt-20 border-t border-gray-200 pt-12 dark:border-gray-800">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Lucci Labs experiments with bleeding-edge DeFi, zk-proofs, and token mechanics.
          </p>
        </div>
      </Section>

      {/* Featured Projects Section */}
      <Section className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl">
          <h2 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            Featured Projects
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            A selection of our current experiments. Expect alpha-quality code
            and occasional breaking changes.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
          
          <div className="mt-12">
            <Button asChild size="lg" variant="outline" className="h-14 rounded-full px-8 font-medium">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Research Section */}
      <Section className="bg-white dark:bg-background">
        <div className="max-w-6xl">
          <h2 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            Research & Notes
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Working drafts, design notes, and lessons from the lab. Unpolished
            by design.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {researchPosts.map(post => (
              <Link
                key={post.slug}
                href={`/research/${post.slug}`}
                className="group block rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-500 dark:text-white">
                  {post.title}
                </h3>
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-500">
                  {formatDistanceToNow(new Date(post.date), {
                    addSuffix: true,
                  })}
                </p>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  {post.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12">
            <Button asChild size="lg" variant="outline" className="h-14 rounded-full px-8 font-medium">
              <Link href="/research">
                Read More Research
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Newsletter Section - Aave style */}
      <Section className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl">
          <h2 className="mb-12 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Stay updated on experiments
          </h2>
          
          <div className="rounded-2xl bg-white p-8 dark:bg-gray-800 md:p-12">
            <div className="mb-6">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
                <div className="h-2 w-2 rounded-full bg-purple-500" />
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-lg border-0 bg-gray-100 px-6 py-4 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
              />
            </div>
            <Button size="lg" className="h-14 rounded-full px-8 font-medium">
              Subscribe
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Code may break; expectations may rug. We're experimenting in public.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
