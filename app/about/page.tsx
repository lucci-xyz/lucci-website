import { Section } from '@/components/section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Callout } from '@/components/callout';
import { Code, Lightbulb, Users, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Section>
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            About Lucci Labs
          </h1>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              We're a small R&D collective focused on Web3 infrastructure,
              cryptographic primitives, and protocol design. Based somewhere
              between San Francisco's builder culture and New York's financial
              rigor—but operating entirely in public on GitHub.
            </p>
            <p>
              Most of our work lives in half-finished branches. We move fast,
              break things, and occasionally ship something useful. If you're
              looking for enterprise-grade, audited, production-ready code,
              you're probably in the wrong place.
            </p>
            <p>
              What we <em>do</em> have: experiments in zero-knowledge proofs,
              MEV-resistant protocol designs, novel tokenomics models, and
              developer tooling that solves problems we've personally hit while
              building in this space.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
            Our Philosophy
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <Code className="mb-2 h-6 w-6" />
                <CardTitle>Open by Default</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Everything we build is open source. We develop in public,
                  break in public, and learn in public. Transparency isn't a
                  marketing strategy—it's how we work.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Lightbulb className="mb-2 h-6 w-6" />
                <CardTitle>Experiment Aggressively</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The best way to understand a system is to try to break it. We
                  test aggressive models, push boundaries, and sometimes fail
                  spectacularly. That's the point.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="mb-2 h-6 w-6" />
                <CardTitle>Ship Fast, Iterate Faster</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Perfect is the enemy of done. We prefer working code over
                  perfect code. Early feedback beats late polish. Version 1 is
                  better than version never.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="mb-2 h-6 w-6" />
                <CardTitle>Build for Builders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We make tools we wish existed. If you're a developer working
                  in Web3, our stuff is for you. Clear docs, minimal
                  abstractions, and honest limitations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            Who We Are
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              A small team of engineers and researchers who've spent too much
              time thinking about adversarial game theory, cryptographic
              assumptions, and why most governance tokens don't work.
            </p>
            <p>
              We've built production systems in DeFi, consulted on protocol
              design, and broken enough smart contracts to know what not to do.
              Now we're building the infrastructure we wish existed when we
              started.
            </p>
          </div>

          <Callout type="default" className="mt-8">
            <p className="font-medium">Note on Funding & Incentives</p>
            <p className="mt-1 text-muted-foreground">
              We're not a VC-backed startup with growth targets. We're not
              selling a token. We're just engineers who like building things and
              occasionally write about what we learn. Some projects might spawn
              products. Most won't. That's fine.
            </p>
          </Callout>
        </div>
      </Section>
    </>
  );
}

