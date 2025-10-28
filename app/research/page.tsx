import { Section } from '@/components/section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getResearchPosts } from '@/lib/mdx';
import { formatDistanceToNow } from 'date-fns';

export default function ResearchPage() {
  const posts = getResearchPosts();

  return (
    <Section>
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Research & Notes
        </h1>
        <p className="text-lg text-muted-foreground">
          Working drafts, design explorations, and lessons from building in
          public. Expect rough edges and evolving ideas.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/research/${post.slug}`}
            className="group"
          >
            <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-md">
              <CardHeader>
                <CardTitle className="group-hover:text-primary">
                  {post.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(post.date), {
                    addSuffix: true,
                  })}
                </p>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {post.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}

