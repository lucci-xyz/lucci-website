'use client';

import { Section } from '@/components/section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - in production, this would send to an API endpoint
    console.log('Form submitted:', formState);
    alert(
      'Thanks for reaching out! This is a placeholder form. In production, this would send your message.'
    );
  };

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground">
            Questions, feedback, or want to collaborate? Reach out.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Links */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  GitHub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Most of our work lives on GitHub. Open an issue, submit a PR,
                  or just browse the repos.
                </p>
                <Button asChild variant="outline">
                  <Link
                    href="https://github.com/LucciCapital"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Our GitHub
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Twitter className="h-5 w-5" />
                  Twitter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Follow us for updates, hot takes, and the occasional thread on
                  protocol design.
                </p>
                <Button asChild variant="outline">
                  <Link
                    href="https://twitter.com/luccilabs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Follow on Twitter
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  For longer conversations or private inquiries.
                </p>
                <Button asChild variant="outline">
                  <Link href="mailto:hello@luccilabs.com">
                    hello@luccilabs.com
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={formState.name}
                    onChange={e =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={e =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your message..."
                    rows={6}
                    value={formState.message}
                    onChange={e =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
                <p className="text-xs text-muted-foreground">
                  Note: This is a placeholder form for demo purposes.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}

