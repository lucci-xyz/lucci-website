import { notFound } from 'next/navigation';
import { getResearchPost, getResearchPosts } from '@/lib/mdx';
import { Section } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = getResearchPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getResearchPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function ResearchPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getResearchPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="mb-8">
          <Link href="/research">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Research
          </Link>
        </Button>

        <article>
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              {post.title}
            </h1>
            <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </div>
    </Section>
  );
}

